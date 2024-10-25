// src/services/posts.js
import Post from '../db/models/Post.js'
import Comment from '../db/models/Comment.js'

/**
 * Creates a new post
 * @param {Object} postData - The data for the new post
 * @returns {Object} The newly created post document
 */
export async function createPost(postData) {
  const {
    title,
    author,
    content,
    albumDetails,
    tags = [],
    embeddedYouTubeLinks = [],
    rating = null,
  } = postData

  const post = new Post({
    title,
    author,
    content,
    albumDetails,
    tags,
    embeddedYouTubeLinks,
    rating,
  })

  return await post.save()
}

/**
 * Retrieves all posts with comment counts
 * @returns {Array} List of posts with each including commentCount
 */
export async function getPostsWithCommentCounts() {
  const posts = await Post.find()
  return await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countDocuments({ postId: post._id })
      return { ...post.toObject(), commentCount } // Spread post data and add commentCount
    }),
  )
}

/**
 * List posts based on filters and sort order, and populate comments.
 * @param {Object} filter - Filter criteria for posts (e.g., author, tag).
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of posts matching criteria with populated comments.
 */
async function listPosts(filter = {}, options = {}) {
  const { sort = { createdAt: -1 }, limit = 10 } = options

  return await Post.find(filter).sort(sort).limit(limit).populate({
    path: 'comments',
    model: Comment,
    select: 'commenter content date',
  })
}

/**
 * List all posts with populated comments.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of all posts with populated comments.
 */
export async function listAllPosts(options = {}) {
  return await listPosts({}, options)
}

/**
 * List posts by a specific author.
 * @param {String} author - The author to filter posts by.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of posts by the author with populated comments.
 */
export async function listPostsByAuthor(author, options = {}) {
  const filter = { author }
  return await listPosts(filter, options)
}

/**
 * List posts by a specific tag.
 * @param {String} tag - The tag to filter posts by.
 * @param {Object} options - Options such as sort order and limit.
 * @returns {Array} - List of posts with the specified tag and populated comments.
 */
export async function listPostsByTag(tag, options = {}) {
  const filter = { tags: tag }
  return await listPosts(filter, options)
}

/**
 * Retrieves a single post by ID with populated comments and commentCount
 * @param {String} postId - The ID of the post
 * @returns {Object} - The post document with populated comments and commentCount
 */
export async function getSinglePost(postId) {
  return await Post.findById(postId).populate({
    path: 'comments',
    model: Comment,
    select: 'commenter content date', // Only retrieve specific fields
  })
}

/**
 * Updates a post by ID with new data
 * @param {String} postId - The ID of the post
 * @param {Object} updateData - The data to update
 * @returns {Object} - The updated post document
 */
export async function updatePost(postId, updateData) {
  return await Post.findByIdAndUpdate(postId, updateData, { new: true })
}

/**
 * Deletes a post by ID and associated comments
 * @param {String} postId - The ID of the post
 * @returns {Object} - The deleted post document
 */
export async function deletePost(postId) {
  await Comment.deleteMany({ postId }) // Delete associated comments
  return await Post.findByIdAndDelete(postId)
}
