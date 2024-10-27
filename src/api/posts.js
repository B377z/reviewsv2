const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/v1'

console.log('Using backend URL:', VITE_BACKEND_URL) // Step 1: Log the backend URL

export async function fetchPosts({ sortBy, sortOrder, author, tag }) {
  const queryParams = new URLSearchParams({
    sortBy,
    sortOrder,
    author,
    tag,
  }).toString()

  const url = `${VITE_BACKEND_URL}/posts?${queryParams}`
  console.log('Fetching posts from:', url) // Step 2: Log the full request URL

  const response = await fetch(url)
  console.log('Response status:', response.status) // Step 2: Log response status

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchPostById(id) {
  const response = await fetch(`${VITE_BACKEND_URL}/posts/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`)
  }

  return response.json()
}

export async function createPost(postData) {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`Error creating post: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function updatePost(id, updateData) {
  const response = await fetch(`${VITE_BACKEND_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
  return response.json()
}

export async function deletePost(id) {
  const response = await fetch(`${VITE_BACKEND_URL}/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
