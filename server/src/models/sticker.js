import mongoose from 'mongoose';

const stickerSchema = mongoose.Schema({
  url: String,
  name: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker;
