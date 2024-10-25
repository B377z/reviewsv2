import mongoose, { Schema } from 'mongoose'
import Comment from './Comment.js' // Ensure Comment model is available

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    albumDetails: {
      albumName: { type: String, required: true },
      artistName: { type: String, required: true },
      releaseDate: { type: Date },
      genres: [{ type: String }],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    embeddedYouTubeLinks: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^https:\/\/www\.youtube\.com\/watch\?v=\w+/.test(v)
          },
          message: (props) => `${props.value} is not a valid YouTube link!`,
        },
      },
    ],
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Reference to Comment model
  },
  {
    timestamps: true,
  },
)

// Create a unique compound index on `title` and `author`
postSchema.index({ title: 1, author: 1 }, { unique: true })

// Virtual field for comment count
postSchema.virtual('commentCount').get(async function () {
  return await Comment.countDocuments({ postId: this._id })
})

const Post = mongoose.model('Post', postSchema)

export default Post
