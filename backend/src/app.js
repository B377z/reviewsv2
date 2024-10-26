import express from 'express'
import cors from 'cors'
import { postsRoutes } from './routes/posts.js'
import { commentsRoutes } from './routes/comments.js'

export const app = express()

// Enable CORS for all routes
app.use(cors())

// Middleware to parse JSON request bodies
app.use(express.json())

// Define routes
postsRoutes(app)
commentsRoutes(app)

// Base route for health check or welcome message
app.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to the API from Express!' })
})
