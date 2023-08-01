import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
  data: String,
  type: {
    type: String,
    enum: ['photo', 'video'], // launchedは、portでのchat用ね。
  },
  duration: Number,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: Date,
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
