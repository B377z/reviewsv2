const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/v1'

export async function fetchCommentsByPost(postId) {
  const response = await fetch(`${VITE_BACKEND_URL}?postId=${postId}`)
  return response.json()
}

export async function createComment(postId, commentData) {
  const response = await fetch(`${VITE_BACKEND_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, ...commentData }),
  })
  return response.json()
}

export async function fetchCommentsByPostId(postId) {
  const response = await fetch(`${VITE_BACKEND_URL}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for postId ${postId}`)
  }
  return response.json()
}
