// src/services/comments.js
import Comment from '../db/models/Comment.js'
import Post from '../db/models/Post.js'

/**
 * Creates a new comment for a specific post
 * @param {Object} commentData - The data for the new comment
 * @returns {Object} The newly created comment document
 */
export async function createComment(commentData) {
  const { postId, commenter, content } = commentData

  const comment = new Comment({
    postId,
    commenter,
    content,
  })

  // Save the comment first
  const savedComment = await comment.save()

  // Then, push the comment ID into the post's comments array
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: savedComment._id },
  })

  return savedComment
}

/**
 * General-purpose function to list comments with sorting and filtering.
 * @param {Object} filter - Filter criteria for comments (e.g., postId, commenter).
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of comments matching the criteria.
 */
async function listComments(filter = {}, options = {}) {
  const { sort = { createdAt: -1 }, limit = 10 } = options

  return await Comment.find(filter).sort(sort).limit(limit)
}

/**
 * List all comments.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of all comments.
 */
export async function listAllComments(options = {}) {
  return await listComments({}, options)
}

/**
 * List comments by a specific post.
 * @param {String} postId - The ID of the post to filter comments by.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of comments for the specified post.
 */
export async function listCommentsByPost(postId, options = {}) {
  const filter = { postId }
  return await listComments(filter, options)
}

/**
 * List comments by a specific commenter.
 * @param {String} commenter - The commenter to filter comments by.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of comments by the specified commenter.
 */
export async function listCommentsByCommenter(commenter, options = {}) {
  const filter = { commenter }
  return await listComments(filter, options)
}

/**
 * Retrieves a single comment by its ID.
 * @param {String} commentId - The ID of the comment to retrieve.
 * @returns {Object} The comment document.
 */
export async function getSingleComment(commentId) {
  return await Comment.findById(commentId)
}

/**
 * Updates an existing comment.
 * @param {String} commentId - The ID of the comment to update.
 * @param {Object} commentData - The updated comment data.
 * @returns {Object} The updated comment document.
 */
export async function updateComment(commentId, updateData) {
  return await Comment.findByIdAndUpdate(commentId, updateData, { new: true })
}

/**
 * Deletes an existing comment.
 * @param {String} commentId - The ID of the comment to delete.
 * @returns {Object} The deleted comment document.
 */
export async function deleteComment(commentId) {
  return await Comment.findByIdAndDelete(commentId)
}
