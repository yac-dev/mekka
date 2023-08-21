import mongoose from 'mongoose';

// だから、lastUpdateするのは、first tagだけでいいかも。。。
const tagSchema = mongoose.Schema({
  icon: String,
  name: String,
  color: String,
  count: Number,
  // lastUpdatedを持っておけばいいのかもしれないが、、、さらに数を出したいとなると、、、、
  space: {
    type: mongoose.Schema.ObjectId,
    ref: 'Space',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updatedAt: Date,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
