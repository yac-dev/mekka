import mongoose from 'mongoose';

// それぞれのmekkaで、人の貢献度みたいなのを出すといいかもな。。。まあ、あくまでこれはsub的な位置付けだけど。
// discordだと、それぞれの部屋でmemberの役割(role)を決められるみたいだね。そして、roleごとにできることを決められる見たい。
// 最終的に、各spaceのrateも出したい。
const spaceSchema = mongoose.Schema({
  name: String,
  icon: String, // s3のlink
  contentType: {
    // type: mongoose.Schema.ObjectId,
    // ref: 'MediaType',
    type: String,
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
  roles: [
    // これいらないかな。。。
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
    },
  ],
  totalPosts: Number,
  totalMembers: Number,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const Space = mongoose.model('Space', spaceSchema);
export default Space;
