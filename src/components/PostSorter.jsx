// src/components/PostSorter.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function PostSorter({ onSort }) {
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('ascending')

  const handleSort = () => {
    onSort({ sortBy, sortOrder })
  }

  return (
    <div>
      <h3>Sort Posts</h3>
      <div>
        <label htmlFor='sortBy'>Sort By:</label>
        <select
          id='sortBy'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='createdAt'>Date Created</option>
          <option value='updatedAt'>Date Updated</option>
        </select>
      </div>
      <div>
        <label htmlFor='sortOrder'>Sort Order:</label>
        <select
          id='sortOrder'
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value='ascending'>Ascending</option>
          <option value='descending'>Descending</option>
        </select>
      </div>
      <button onClick={handleSort}>Apply Sort</button>
    </div>
  )
}

PostSorter.propTypes = {
  onSort: PropTypes.func.isRequired, // Callback to pass sort data to parent
}
