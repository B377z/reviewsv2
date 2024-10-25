// tests/services/comments.test.js
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createPost } from '../../services/posts.js'
import {
  createComment,
  listAllComments,
  listCommentsByPost,
  listCommentsByCommenter,
  getSingleComment,
  updateComment,
  deleteComment,
} from '../../services/comments.js'
import Comment from '../../db/models/Comment.js' // Import Comment model

let mongoServer
let post // Declare post as a global variable to use across tests
let comment // Declare comment as a global variable to use across tests

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

beforeEach(async () => {
  // Create a new post for each test
  post = await createPost({
    title: 'Post for Comment Testing',
    author: 'Tester',
    content: 'This is a test post for comment testing.',
    albumDetails: {
      albumName: 'Album for Comments',
      artistName: 'Artist Name',
    },
  })
})

afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Comment Service - createComment', () => {
  test('should create a new comment with valid data', async () => {
    const commentData = {
      postId: post._id,
      commenter: 'Jane Doe',
      content: 'This is a valid comment.',
    }

    const comment = await createComment(commentData)

    expect(comment).toHaveProperty('_id')
    expect(comment.postId.toString()).toBe(post._id.toString())
    expect(comment.commenter).toBe(commentData.commenter)
    expect(comment.content).toBe(commentData.content)
    expect(comment).toHaveProperty('createdAt')
    expect(comment).toHaveProperty('updatedAt')
  })

  test('should fail to create a comment without required fields', async () => {
    const invalidCommentData = {
      // postId is missing
      commenter: 'Jane Doe',
      content: 'This comment has no post ID.',
    }

    await expect(createComment(invalidCommentData)).rejects.toThrow(
      mongoose.Error.ValidationError,
    )
  })

  test('should retrieve all comments for a specific post', async () => {
    await createComment({
      postId: post._id,
      commenter: 'User1',
      content: 'First comment',
    })
    await createComment({
      postId: post._id,
      commenter: 'User2',
      content: 'Second comment',
    })

    const comments = await Comment.find({ postId: post._id })
    expect(comments.length).toBe(2)
    expect(comments[0].content).toBe('First comment')
    expect(comments[1].content).toBe('Second comment')
  })

  test('should fail to update a non-existent comment', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const updatedContent = { content: 'Updated content' }

    const updatedComment = await Comment.findByIdAndUpdate(
      fakeId,
      updatedContent,
      {
        new: true,
      },
    )
    expect(updatedComment).toBeNull()
  })

  test('should delete a comment by its ID', async () => {
    const comment = await createComment({
      postId: post._id,
      commenter: 'User',
      content: 'Comment to be deleted',
    })

    await Comment.findByIdAndDelete(comment._id)
    const deletedComment = await Comment.findById(comment._id)
    expect(deletedComment).toBeNull()
  })
})

describe('Comment Service - list functions', () => {
  beforeEach(async () => {
    // Create a sample post for associating comments
    post = await createPost({
      title: 'Post for Comment Listing',
      author: 'Author',
      content: 'Content of the post.',
      albumDetails: { albumName: 'Album Name', artistName: 'Artist' },
    })

    // Add comments associated with the post
    await Comment.create([
      {
        postId: post._id,
        commenter: 'User1',
        content: 'First comment on the post',
      },
      {
        postId: post._id,
        commenter: 'User2',
        content: 'Second comment on the post',
      },
      {
        postId: post._id,
        commenter: 'User1',
        content: 'Third comment on the post',
      },
    ])
  })

  test('should list all comments', async () => {
    const comments = await listAllComments()

    expect(comments.length).toBe(3)
    expect(comments[0]).toHaveProperty('content')
  })

  test('should list comments by a specific post', async () => {
    const comments = await listCommentsByPost(post._id)

    expect(comments.length).toBe(3)
    expect(comments[0].postId.toString()).toBe(post._id.toString())
  })

  test('should list comments by a specific commenter', async () => {
    const comments = await listCommentsByCommenter('User1')

    expect(comments.length).toBe(2) // User1 has made 2 comments
    expect(comments[0].commenter).toBe('User1')
    expect(comments[1].commenter).toBe('User1')
  })
})

describe('Comment Service - CRUD functions', () => {
  beforeEach(async () => {
    post = await createPost({
      title: 'Test Post',
      author: 'Author',
      content: 'Post content.',
      albumDetails: { albumName: 'Album', artistName: 'Artist' },
    })
    comment = await createComment({
      postId: post._id,
      commenter: 'User1',
      content: 'Comment content',
    })
  })

  test('should retrieve a single comment', async () => {
    const fetchedComment = await getSingleComment(comment._id)
    expect(fetchedComment._id.toString()).toBe(comment._id.toString())
  })

  test('should update a comment', async () => {
    const updatedComment = await updateComment(comment._id, {
      content: 'Updated content',
    })
    expect(updatedComment.content).toBe('Updated content')
  })

  test('should delete a comment', async () => {
    await deleteComment(comment._id)
    const deletedComment = await getSingleComment(comment._id)
    expect(deletedComment).toBeNull()
  })
})
