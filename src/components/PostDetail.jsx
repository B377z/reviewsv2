// src/components/PostDetail.jsx
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchPostById } from '../api/posts'
import { useParams } from 'react-router-dom'
import '../App.css'
import { CommentList } from './CommentList'
import { CommentForm } from './CommentForm'
import { fetchCommentsByPostId } from '../api/comments'

export function PostDetail() {
  const { postId } = useParams()
  console.log('Extracted postId:', postId) // For debugging purposes
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  const convertToEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  useEffect(() => {
    async function getPost() {
      try {
        if (postId) {
          const fetchedPost = await fetchPostById(postId)
          console.log('Fetched Post:', fetchedPost) // For debugging purposes
          setPost(fetchedPost)
          const fetchedComments = await fetchCommentsByPostId(postId)
          setComments(fetchedComments)
        } else {
          console.error('postId is undefined')
        }
      } catch (error) {
        console.error('Error fetching post or comments:', error)
        setError('Failed to load post or comments.')
      }
    }
    getPost()
  }, [postId])

  const handleCommentAdded = async () => {
    try {
      if (postId) {
        const updatedComments = await fetchCommentsByPostId(postId)
        setComments(updatedComments)
      }
    } catch (error) {
      console.error('Error fetching updated comments:', error)
    }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className='app'>
      <h2>{post.title}</h2>
      <h3>Author: {post.author}</h3>
      <p>
        <strong>Created At:</strong>{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p>{post.content}</p>

      {post.albumDetails && (
        <div>
          <h3>Album Details</h3>
          <p>
            <strong>Album:</strong> {post.albumDetails.albumName}
          </p>
          <p>
            <strong>Artist:</strong> {post.albumDetails.artistName}
          </p>
          {post.albumDetails.releaseDate && (
            <p>
              <strong>Release Date:</strong>{' '}
              {new Date(post.albumDetails.releaseDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {post.tags?.length > 0 && (
        <div>
          <h3>Tags</h3>
          <p>{post.tags.join(', ')}</p>
        </div>
      )}

      {post.embeddedYouTubeLinks?.length > 0 && (
        <div>
          <h3>YouTube Links</h3>
          {post.embeddedYouTubeLinks.map((link, index) => (
            <div key={index} className='youtube-video'>
              <iframe
                width='100%'
                height='315'
                src={convertToEmbedUrl(link)}
                title={`YouTube video ${index + 1}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
      <hr />

      {/* Comment List */}
      <CommentList comments={comments} />

      {/* Comment Form with postId prop */}
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </div>
  )
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string,
    albumDetails: PropTypes.shape({
      albumName: PropTypes.string,
      artistName: PropTypes.string,
      releaseDate: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
    embeddedYouTubeLinks: PropTypes.arrayOf(PropTypes.string),
  }),
}
