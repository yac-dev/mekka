import mongoose, { mongo } from 'mongoose';

const stickerSchema = mongoose.Schema({
  url: String,
  name: String,
});

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker;
