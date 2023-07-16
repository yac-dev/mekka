import mongoose from 'mongoose';

const tagAndSpaceRelationshipSchema = mongoose.Schema({
  tag: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tag',
  },
  space: {
    type: mongoose.Schema.ObjectId,
    ref: 'Space',
  },
  createdAt: Date,
});

const TagAndSpaceRelationship = mongoose.model('TagAndSpaceRelationship', tagAndSpaceRelationshipSchema);

export default TagAndSpaceRelationship;
