import React from 'react'
import PropTypes from 'prop-types'
import { CommentCard } from './CommentCard'

export function CommentList({ comments }) {
  if (!Array.isArray(comments)) {
    console.error('Expected comments to be an array, but got:', comments)
    return null
  }
  console.log('Comments passed to CommentList:', comments) // Debugging line
  return (
    <div className='comment-list'>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      commenter: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
