import Space from '../models/space';
import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';
import { uploadPhoto } from '../services/s3';

// type付も、最初から完璧でなくともいいぞ。
export const createSpace = async (request, response) => {
  try {
    const {
      name,
      contentType,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      createdBy,
      // videoLength,
      // reactions,
      // tags,
    } = request.body;

    const space = await Space.create({
      name,
      // icon,
      icon: `https://mekka-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/photos/${request.file.filename}`,
      contentType,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      createdBy,
      createdAt: new Date(),
    });

    const spaceAndUserRelationship = await SpaceAndUserRelationship.create({
      space: space._id,
      user: createdBy,
      createdAt: new Date(),
    });
    uploadPhoto(request.file.filename);

    response.status(201).json({
      space,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSpaces = async (request, response) => {
  try {
    const spaces = await Space.find({}).select({ _id: true, name: true });
    response.status(200).json({
      spaces,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSpace = async (request, response) => {
  try {
    const space = await Space.findById(request.params.spaceId);
    response.status(200).json({
      space,
    });
  } catch (error) {
    console.log(error);
  }
};
