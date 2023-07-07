import mongoose from 'mongoose';

// それぞれのmekkaで、人の貢献度みたいなのを出すといいかもな。。。まあ、あくまでこれはsub的な位置付けだけど。
// discordだと、それぞれの部屋でmemberの役割(role)を決められるみたいだね。そして、roleごとにできることを決められる見たい。
const mekkaSchema = mongoose.Schema({
  name: String,
  thumbnail: String, // s3のlink
  mediaType: {
    type: mongoose.Schema.ObjectId,
    ref: 'MediaType',
  },
  videoLength: Number,
  isPublic: {
    required: true,
    type: Boolean,
  },
  isCommentAvailable: {
    required: true,
    type: Boolean,
  },
  isReactionAvailable: {
    required: true,
    type: Boolean,
  },
  reactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Reaction',
    },
  ],
  tags: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tag',
    },
  ], // mekkaに関するtagにもなるし、それぞれのビデオ、写真につけるtagにもなる。// このtagでも、それぞれのmekkaの特徴を表すことになる。
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  roles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
    },
  ],
  createdAt: Date,
});

export const Mekka = mongoose.model('Mekka', mekkaSchema);
