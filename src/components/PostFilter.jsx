// src/components/PostFilter.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function PostFilter({ onFilter }) {
  const [author, setAuthor] = useState('')
  const [tag, setTag] = useState('')

  const handleFilter = () => {
    onFilter({ author, tag })
  }

  return (
    <div>
      <h3>Filter Posts</h3>
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          id='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Filter by author'
        />
      </div>
      <div>
        <label htmlFor='tag'>Tag:</label>
        <input
          id='tag'
          type='text'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder='Filter by tag'
        />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  )
}

PostFilter.propTypes = {
  onFilter: PropTypes.func.isRequired, // Callback to pass filter data to parent
}
