import Space from '../models/space';
import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';
import Tag from '../models/tag';
import TagAndSpaceRelationship from '../models/tagAndSpaceRelationship';
import Reaction from '../models/reaction';
import { uploadPhoto } from '../services/s3';

// space作りだが、、、
// type付も、最初から完璧でなくともいいぞ。
// 1, reactionを作って、
// 2, tagを作る
export const createSpace = async (request, response) => {
  try {
    const {
      name,
      contentType,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      createdBy,
      videoLength,
      reactions,
      stay,
    } = request.body;
    console.log(request.body);

    const space = new Space({
      name,
      icon: `https://mekka-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/photos/${request.file.filename}`,
      contentType,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      stay,
      createdBy,
      createdAt: new Date(),
    });
    if (contentType === 'video') {
      space.videoLength = videoLength;
    }

    // reactionを作る。
    if (isReactionAvailable && reactions.length) {
      const reactionOptions = JSON.parse(reactions).map((reaction) => {
        if (reaction.emojiType === 'normal') {
          return {
            space: space._id,
            emojiType: 'normal',
            emoji: reaction.emoji,
          };
        } else if (reaction.iconType === 'specialEmoji') {
          return {
            space: space._id,
            emojiType: 'specialEmoji',
            specialEmoji: reaction.specialEmoji._id,
          };
        }
      });
      const createdReactions = await Reaction.insertMany(reactionOptions);
      const reactionIds = createdReactions.map((reaction) => reaction._id);
      // ここでreactionのidだけ入れる。そんで、↓でsaveする。
      space.reactions = reactionIds; // spaceに直接idを入れる。
    }

    // tagを作る。
    // {icon: '', name: '', color: ''} // defaultでは、iconは無しでいい。
    const tagObjects = JSON.parse(tags).map((tag) => {
      return {
        icon: '',
        name: tag,
        color: '',
      };
    });
    const tagDocuments = await Tag.insertMany(tagObjects);
    const tagIds = tagDocuments.map((tag) => tag._id);
    const tagSpaceRels = tagIds.map((tagId) => {
      return {
        tag: tagId,
        space: space._id,
      };
    });
    space.tags = tagIds;

    const tagAndSpaceRelationships = await TagAndSpaceRelationship.insertMany(tagSpaceRels);

    const spaceAndUserRelationship = await SpaceAndUserRelationship.create({
      space: space._id,
      user: createdBy,
      createdAt: new Date(),
    });
    space.save();
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
