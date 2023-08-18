import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  contents: [{ type: mongoose.Schema.ObjectId, ref: 'Content' }],
  caption: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  space: { type: mongoose.Schema.ObjectId, ref: 'Space' },
  // tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  disappearAt: Date, // もしくはnull
  createdAt: Date,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
