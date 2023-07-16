import mongoose, { mongo } from 'mongoose';

const specialEmojiSchema = mongoose.Schema({
  url: String,
  name: String,
});

const SpecialEmoji = mongoose.model('Reaction', specialEmojiSchema);

export default SpecialEmoji;
