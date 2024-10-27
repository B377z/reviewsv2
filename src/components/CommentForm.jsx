// src/components/CommentForm.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function CommentForm({ postId, onCommentAdded }) {
  const [commenter, setCommenter] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      postId,
      commenter,
      content,
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to add comment')
      }

      // Notify the parent component about the new comment
      onCommentAdded()
      setCommenter('')
      setContent('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <div>
        <label htmlFor='commenter'>Your Name:</label>
        <input
          id='commenter'
          type='text'
          value={commenter}
          onChange={(e) => setCommenter(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor='content'>Your Comment:</label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <br />
      <button type='submit'>Submit Comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
}
