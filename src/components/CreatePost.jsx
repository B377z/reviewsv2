import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createPost } from '../api/posts'
import './formStyles.css'

export function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [albumName, setAlbumName] = useState('')
  const [artistName, setArtistName] = useState('')
  const [tags, setTags] = useState('')
  const [embeddedYouTubeLinks, setEmbeddedYouTubeLinks] = useState([''])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postData = {
      title,
      author,
      content,
      albumDetails: {
        albumName,
        artistName,
      },
      tags: tags.split(',').map((tag) => tag.trim()),
      embeddedYouTubeLinks: embeddedYouTubeLinks.filter((link) => link), // Filter out empty entries
    }

    console.log('Submitting post data:', JSON.stringify(postData, null, 2)) // Log postData

    try {
      await createPost(postData)
      onPostCreated && onPostCreated() // Notify parent component
      setTitle('')
      setAuthor('')
      setContent('')
      setAlbumName('')
      setArtistName('')
      setTags('')
      setEmbeddedYouTubeLinks([''])
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleYouTubeLinkChange = (index, value) => {
    const links = [...embeddedYouTubeLinks]
    links[index] = value
    setEmbeddedYouTubeLinks(links)
  }

  const addYouTubeLinkField = () => {
    setEmbeddedYouTubeLinks([...embeddedYouTubeLinks, ''])
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          id='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor='content'>Content:</label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <br />
      <div>
        <label htmlFor='albumName'>Album Name:</label>
        <input
          id='albumName'
          type='text'
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='artistName'>Artist Name:</label>
        <input
          id='artistName'
          type='text'
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='tags'>Tags (comma-separated):</label>
        <input
          id='tags'
          type='text'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='youTubeLinks'>YouTube Links:</label>
        {embeddedYouTubeLinks.map((link, index) => (
          <div key={index}>
            <input
              type='text'
              placeholder='https://www.youtube.com/watch?v=...'
              value={link}
              onChange={(e) => handleYouTubeLinkChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type='button' onClick={addYouTubeLinkField}>
          Add Another Link
        </button>
      </div>
      <br />
      <button type='submit'>Create Post</button>
    </form>
  )
}

CreatePost.propTypes = {
  onPostCreated: PropTypes.func, // Optional function callback for after post creation
}
