import mongoose from 'mongoose';

const mediaTypeSchema = mongoose.Schema({
  type: String, // photo video
});

export const MediaType = mongoose.model('MediaType', mediaTypeSchema);
