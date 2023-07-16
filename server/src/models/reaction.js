import mongoose, { mongo } from 'mongoose';

const reactionSchema = mongoose.Schema({
  emojiType: String, // normal, specialEmoji
  emoji: String,
  specialEmoji: {
    type: mongoose.Schema.ObjectId,
    ref: 'SpecialEmoji',
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
