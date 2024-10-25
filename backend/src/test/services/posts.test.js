import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Post from '../../db/models/Post.js' // Import the Post model
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getSinglePost,
  updatePost,
  deletePost,
} from '../../services/posts.js'
import Comment from '../../db/models/Comment.js' // Import the Comment model
import { createComment } from '../../services/comments.js'

let mongoServer
let post

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)

  // Ensure indexes are created on the Post model
  await Post.createIndexes()
})

afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Post Service - createPost', () => {
  test('should create a new post with specified properties', async () => {
    const postData = {
      title: 'Unique Post Title',
      author: 'Test Author',
      content: 'This is a unique post.',
      albumDetails: {
        albumName: 'Unique Album',
        artistName: 'Test Artist',
        releaseDate: new Date('2024-01-01'),
        genres: ['Hip-Hop', 'Jazz'],
      },
      tags: ['Test', 'Sample'],
      embeddedYouTubeLinks: ['https://www.youtube.com/watch?v=samplelink'],
      rating: 8,
    }

    const post = await createPost(postData)

    expect(post).toHaveProperty('_id')
    expect(post.title).toBe(postData.title)
  })

  test('should fail to create a post with duplicate title and author', async () => {
    const postData = {
      title: 'Duplicate Post Title',
      author: 'Author Name',
      content: 'Content of the post.',
      albumDetails: {
        albumName: 'Album Name',
        artistName: 'Artist',
      },
    }

    // First post creation should succeed
    await createPost(postData)

    // Second post with the same title and author should throw an error
    try {
      await createPost(postData)
    } catch (error) {
      expect(error.message).toContain(
        'Duplicate title and author. Post already exists.',
      )
    }
  })
})

describe('Post Service - list functions', () => {
  let post1, post2

  beforeEach(async () => {
    // Create sample posts
    post1 = await Post.create({
      title: 'Post 1',
      author: 'Author 1',
      content: 'Content for post 1',
      albumDetails: { albumName: 'Album 1', artistName: 'Artist 1' },
      tags: ['Tag1', 'Tag2'],
    })

    post2 = await Post.create({
      title: 'Post 2',
      author: 'Author 2',
      content: 'Content for post 2',
      albumDetails: { albumName: 'Album 2', artistName: 'Artist 2' },
      tags: ['Tag2', 'Tag3'],
    })

    // Add comments to post1 and post2
    await Comment.create([
      {
        postId: post1._id,
        commenter: 'User A',
        content: 'Comment 1 on Post 1',
      },
      {
        postId: post1._id,
        commenter: 'User B',
        content: 'Comment 2 on Post 1',
      },
      { postId: post2._id, commenter: 'User C', content: 'Comment on Post 2' },
    ])

    // Link comments in posts
    post1.comments = await Comment.find({ postId: post1._id }).select('_id')
    post2.comments = await Comment.find({ postId: post2._id }).select('_id')
    await post1.save()
    await post2.save()
  })

  test('should list all posts with comments', async () => {
    const posts = await listAllPosts()

    expect(posts.length).toBe(2)
    expect(posts[0].comments.length).toBeGreaterThan(0) // post1 has comments
    expect(posts[1].comments.length).toBeGreaterThan(0) // post2 has comments
    expect(posts[0].comments[0].content).toBeDefined() // Comments should have content
  })

  test('should list posts by a specific author', async () => {
    const posts = await listPostsByAuthor('Author 1')

    expect(posts.length).toBe(1) // Only post1 has Author 1
    expect(posts[0].author).toBe('Author 1')
    expect(posts[0].comments.length).toBe(2) // post1 has 2 comments
  })

  test('should list posts by a specific tag', async () => {
    const posts = await listPostsByTag('Tag2')

    expect(posts.length).toBe(2) // Both post1 and post2 have Tag2
    expect(posts[0].tags).toContain('Tag2')
    expect(posts[1].tags).toContain('Tag2')
  })
})

describe('Post Service - CRUD functions', () => {
  beforeEach(async () => {
    post = await createPost({
      title: 'Test Post',
      author: 'Author',
      content: 'Post content.',
      albumDetails: { albumName: 'Album', artistName: 'Artist' },
    })
  })

  test('should retrieve a single post with comments', async () => {
    await createComment({
      postId: post._id,
      commenter: 'User1',
      content: 'Comment content',
    })

    const fetchedPost = await getSinglePost(post._id)

    expect(fetchedPost._id.toString()).toBe(post._id.toString())
    expect(fetchedPost.comments.length).toBe(1) // Verify the comment count
    expect(fetchedPost.comments[0].content).toBe('Comment content') // Verify the comment content
  })

  test('should update a post', async () => {
    const updatedPost = await updatePost(post._id, { title: 'Updated Title' })
    expect(updatedPost.title).toBe('Updated Title')
  })

  test('should delete a post and associated comments', async () => {
    await createComment({
      postId: post._id,
      commenter: 'User1',
      content: 'Comment',
    })
    await deletePost(post._id)

    const deletedPost = await getSinglePost(post._id)
    expect(deletedPost).toBeNull()
  })
})
