import PropTypes from 'prop-types'
import react from 'react'
import { Link } from 'react-router-dom'

export function PostCard({ post }) {
  return (
    <div className='post-card'>
      <Link to={`/posts/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>Author: {post.author}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

// Define PropTypes for PostCard
PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}
