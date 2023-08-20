import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  icon: String,
  name: String,
  color: String,
  count: Number,
  space: {
    type: mongoose.Schema.ObjectId,
    ref: 'Space',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
