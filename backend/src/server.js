// server.js
import mongoose from 'mongoose' // Ensure mongoose is imported
import { initDatabase } from './db/init.js'
import Post from './db/models/Post.js'

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/blogDB' // Adjust as needed

// Initialize Database
await initDatabase(mongoURI)

// Create a new post
async function createAndUpdatePost() {
  const post = new Post({
    title: 'Rap Album Review: Illmatic',
    author: 'John Doe',
    content: 'A detailed review of Nas\'s iconic album "Illmatic."',
    albumDetails: {
      albumName: 'Illmatic',
      artistName: 'Nas',
      releaseDate: new Date('1994-04-19'),
      genres: ['Hip-Hop', 'Rap'],
    },
    tags: ['Classic', '1990s', 'Hip-Hop'],
    embeddedYouTubeLinks: ['https://www.youtube.com/watch?v=e5PnuIRnJW8'],
    rating: 10,
    comments: [
      {
        commenter: 'Jane Smith',
        content: 'Great review! Illmatic is a classic.',
      },
    ],
  })

  try {
    const createdPost = await post.save()
    console.log('Post created successfully:', createdPost)

    // Update the post
    const updatePost = await Post.findByIdAndUpdate(
      createdPost._id,
      {
        content: 'An updated review of Nas\'s iconic album "Illmatic."',
        $push: { tags: 'Updated' },
      },
      { new: true },
    )
    console.log('Post updated successfully:', updatePost)
  } catch (error) {
    console.error('Error creating or updating post:', error)
  }
}

// Fetch all posts from the database and log timestamps
async function fetchPosts() {
  try {
    const posts = await Post.find()
    posts.forEach((post) => {
      console.log('Post:', post)
      console.log('Created At:', post.createdAt)
      console.log('Updated At:', post.updatedAt)
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

// Main Execution Block
;(async () => {
  try {
    await createAndUpdatePost()
    await fetchPosts()
  } finally {
    mongoose.connection.close() // Close the connection after operations
    console.log('Connection closed')
  }
})()
