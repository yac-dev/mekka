import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
  },
  createdAt: Date,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
