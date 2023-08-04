import mongoose, { mongo } from 'mongoose';

const reactionSchema = mongoose.Schema({
  emojiType: String, // normal, custom
  emoji: String,
  customEmoji: {
    type: mongoose.Schema.ObjectId,
    ref: 'CustomEmoji',
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
