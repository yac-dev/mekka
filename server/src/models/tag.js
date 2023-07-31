import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  icon: String,
  name: String,
  color: String,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
