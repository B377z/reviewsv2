import React from 'react'
import PropTypes from 'prop-types'

export function CommentCard({ comment }) {
  return (
    <div className='comment-card'>
      <p>
        <strong>{comment.commenter}</strong>
      </p>
      <p>{comment.content}</p>
      <p>
        Commented on:{' '}
        {comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString()
          : 'Date not available'}
      </p>
    </div>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    commenter: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string, // Make this optional to avoid prop-type warnings
  }).isRequired,
}
