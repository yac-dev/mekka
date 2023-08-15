// postをtagで検索する。そのためにも、postでtagsを持っておくのはだめ。
import mongoose from 'mongoose';

const postAndTagRelationshipSchema = mongoose.Schema({
  post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
  tags: { type: mongoose.Schema.ObjectId, ref: 'Tag' },
});

const PostAndTagRelationship = mongoose.model('PostAndTagRelationship', postAndTagRelationshipSchema);

export default PostAndTagRelationship;
