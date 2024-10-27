// src/components/PostList.jsx
import React, { useState, useEffect } from 'react'
import { fetchPosts } from '../api/posts'
import { PostFilter } from './PostFilter'
import { PostSorter } from './PostSorter'
import { PostCard } from './PostCard'

export function PostList() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({
    sortBy: 'createdAt',
    sortOrder: 'ascending',
  })

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await fetchPosts({ ...filter, ...sort })
      setPosts(response)
    }
    fetchFilteredPosts()
  }, [filter, sort])

  const handleFilterChange = (filterData) => setFilter(filterData)
  const handleSortChange = (sortData) => setSort(sortData)

  return (
    <div>
      <PostFilter onFilter={handleFilterChange} />
      <PostSorter onSort={handleSortChange} />
      <div className='post-list'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
