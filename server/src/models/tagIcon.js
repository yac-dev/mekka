import mongoose from 'mongoose';

const tagIconSchema = mongoose.Schema({
  type: String, // 'icon','sticker', 'image'
  icon: String, // url
  sticker: String,
  image: String,
});

const TagIcon = mongoose.model('TagIcon', tagIconSchema);

export default TagIcon;
