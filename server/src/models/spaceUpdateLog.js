import mongoose from 'mongoose';

const spaceUpdateLogSchema = mongoose.Schema({
  space: {
    type: mongoose.Schema.ObjectId,
    ref: 'Space',
  },
  type: [String], //post, tag createなど
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updatedAt: Date,
});

// const SpaceLog = mongoose.model('SpaceLog', spaceLogSchema);
// export default SpaceLog;
