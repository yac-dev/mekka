import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  name: String,
  color: String,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
