import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  contents: [{ type: mongoose.Schema.ObjectId, ref: 'Content' }],
  caption: String,
  locationTag: { type: mongoose.Schema.ObjectId, ref: 'LocationTag' }, // これは一つのみ。
  space: { type: mongoose.Schema.ObjectId, ref: 'Space' },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: Date,
  // disappearAt: Date, // もしくはnull
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     default: 'Point',
  //   },
  //   coordinates: [Number],
  // },
  // tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
