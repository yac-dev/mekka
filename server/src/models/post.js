import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  content: [{ type: mongoose.Schema.ObjectId, ref: 'Content' }],
  caption: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: Date,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
