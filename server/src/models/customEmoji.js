import mongoose, { mongo } from 'mongoose';

const customEmojiSchema = mongoose.Schema({
  url: String,
  name: String,
});

const CustomEmoji = mongoose.model('CustomEmoji', customEmojiSchema);

export default CustomEmoji;
