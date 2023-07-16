import mongoose from 'mongoose';

const iconSchema = mongoose.Schema({
  url: String,
  name: String,
  color: String,
});

const Icon = mongoose.model('Icon', iconSchema);

export default Icon;
