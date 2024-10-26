import {
  createComment,
  listCommentsByPost,
  updateComment,
  deleteComment,
} from '../services/comments.js'

export function commentsRoutes(app) {
  // Route: POST /api/v1/posts/:postId/comments - Create a comment for a specific post
  app.post('/api/v1/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params
    const { commenter, content } = req.body

    try {
      const comment = await createComment({ postId, commenter, content })
      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating comment:', error)
      res.status(500).json({ message: 'Failed to create comment' })
    }
  })

  // Route: GET /api/v1/posts/:postId/comments - Get all comments for a specific post
  app.get('/api/v1/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params

    try {
      const comments = await listCommentsByPost(postId)
      res.status(200).json(comments)
    } catch (error) {
      console.error('Error retrieving comments:', error)
      res.status(500).json({ message: 'Failed to retrieve comments' })
    }
  })

  // Route: PATCH /api/v1/comments/:commentId - Update a specific comment by ID
  app.patch('/api/v1/comments/:commentId', async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    try {
      const updatedComment = await updateComment(commentId, { content })
      if (updatedComment) {
        res.status(200).json(updatedComment)
      } else {
        res.status(404).json({ message: 'Comment not found' })
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      res.status(500).json({ message: 'Failed to update comment' })
    }
  })

  // Route: DELETE /api/v1/comments/:commentId - Delete a specific comment by ID
  app.delete('/api/v1/comments/:commentId', async (req, res) => {
    const { commentId } = req.params

    try {
      const deletedComment = await deleteComment(commentId)
      if (deletedComment) {
        res.status(200).json({ message: 'Comment deleted' })
      } else {
        res.status(404).json({ message: 'Comment not found' })
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      res.status(500).json({ message: 'Failed to delete comment' })
    }
  })

  // Update a comment by ID
  app.patch('/api/v1/posts/:postId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params
    const updateData = req.body

    try {
      const updatedComment = await updateComment(commentId, updateData)
      if (updatedComment) {
        res.status(200).json(updatedComment)
      } else {
        res.status(404).json({ message: 'Comment not found' })
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      res.status(500).json({ message: 'Failed to update comment' })
    }
  })

  // Delete a comment by ID
  app.delete('/api/v1/posts/:postId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params

    try {
      const deletedComment = await deleteComment(commentId)
      if (deletedComment) {
        res.status(200).json({ message: 'Comment deleted successfully' })
      } else {
        res.status(404).json({ message: 'Comment not found' })
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      res.status(500).json({ message: 'Failed to delete comment' })
    }
  })
}
