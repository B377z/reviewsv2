import React, { useState, useEffect } from 'react'
import { fetchPosts } from '../api/posts'
import { PostCard } from './PostCard'
import { PostFilter } from './PostFilter'
import { PostSorter } from './PostSorter'
import '../App.css'

export function HomePage() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({
    author: '', // Default to empty for clarity
    tag: '', // Default to empty for clarity
  })
  const [sort, setSort] = useState({
    sortBy: 'createdAt',
    sortOrder: 'ascending',
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const response = await fetchPosts({ ...filter, ...sort })
        console.log('Fetched Posts:', response) // For debugging purposes
        setPosts(response)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts. Please try again.')
      }
    }
    fetchFilteredPosts()
  }, [filter, sort])

  const handleFilterChange = (filterData) => setFilter(filterData)
  const handleSortChange = (sortData) => setSort(sortData)

  return (
    <div>
      <h1>All Posts</h1>
      <hr />
      <PostFilter onFilter={handleFilterChange} />
      <hr />
      <PostSorter onSort={handleSortChange} />
      {error && <p className='error-message'>{error}</p>}
      <div className='post-list'>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  )
}
