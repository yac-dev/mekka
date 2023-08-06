import mongoose, { mongo } from 'mongoose';

const reactionSchema = mongoose.Schema({
  type: String, // emoji, sticker
  emoji: String,
  sticker: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sticker',
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
