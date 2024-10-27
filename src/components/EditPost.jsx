// src/components/EditPost.jsx

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPostById, updatePost } from '../api/posts' // Adjust based on your API structure

export function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: '',
    author: '',
    content: '',
  })

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await fetchPostById(id)
        setPost(fetchedPost)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }
    fetchPost()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updatePost(id, post)
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            id='author'
            name='author'
            value={post.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            name='content'
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Update Post</button>
      </form>
    </div>
  )
}
