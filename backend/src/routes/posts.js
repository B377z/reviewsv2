// src/routes/posts.js

import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  // GET /api/v1/posts: Get a list of all posts (with optional sorting, filtering)
  app.get('/api/v1/posts', async (req, res) => {
    try {
      // Extract query params
      const {
        sortBy = 'createdAt',
        sortOrder = 'descending',
        author,
        tag,
      } = req.query

      let posts

      // Handle different query cases
      if (author) {
        posts = await listPostsByAuthor(author, {
          sort: { [sortBy]: sortOrder === 'ascending' ? 1 : -1 },
        })
      } else if (tag) {
        posts = await listPostsByTag(tag, {
          sort: { [sortBy]: sortOrder === 'ascending' ? 1 : -1 },
        })
      } else {
        posts = await listAllPosts({
          sort: { [sortBy]: sortOrder === 'ascending' ? 1 : -1 },
        })
      }

      res.json(posts)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error })
    }
  })

  // GET /api/v1/posts/:id: Get a single post by ID
  app.get('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await getSinglePost(req.params.id)
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching the post', error })
    }
  })

  // POST /api/v1/posts: Create a new post
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const newPost = await createPost(req.body)
      res.status(201).json(newPost)
    } catch (error) {
      res.status(400).json({ message: 'Error creating the post', error })
    }
  })

  // PATCH /api/v1/posts/:id: Update an existing post by ID
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const updatedPost = await updatePost(req.params.id, req.body)
      if (updatedPost) {
        res.json(updatedPost)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      res.status(400).json({ message: 'Error updating the post', error })
    }
  })

  // DELETE /api/v1/posts/:id: Delete an existing post by ID
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const deletedPost = await deletePost(req.params.id)
      if (deletedPost) {
        res.json({ message: 'Post deleted successfully' })
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting the post', error })
    }
  })
}
