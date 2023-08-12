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
      description,
      videoLength,
      disappearAfter,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      reactions,
      createdBy,
    } = request.body;
    console.log(request.body);

    const space = new Space({
      name,
      icon: `https://mekka-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/icons/${request.file.filename}`,
      contentType,
      description,
      isPublic: Boolean(isPublic),
      isCommentAvailable: Boolean(isCommentAvailable),
      isReactionAvailable: Boolean(isReactionAvailable),
      createdBy,
      createdAt: new Date(),
      totalPosts: 0,
      totalMembers: 1,
      rate: 0,
    });
    if (contentType === 'video' || contentType === 'photoAndVideo') {
      space.videoLength = videoLength;
    }
    // stayがない、つまりpermananetならここのfieldは埋めない。
    if (Number(disappearAfter)) {
      space.disappearAfter = Number(disappearAfter);
    }

    // reactionを作る。
    if (isReactionAvailable && reactions.length) {
      const reactionOptions = JSON.parse(reactions).map((reaction) => {
        if (reaction.type === 'emoji') {
          return {
            space: space._id,
            type: 'emoji',
            emoji: reaction.emoji,
          };
        } else if (reaction.type === 'sticker') {
          return {
            space: space._id,
            type: 'sticker',
            sticker: reaction.sticker._id,
          };
        }
      });
      const createdReactions = await Reaction.insertMany(reactionOptions);
      const reactionIds = createdReactions.map((reaction) => reaction._id);
      space.reactions = reactionIds; // spaceに直接idを入れる。
    }

    const spaceAndUserRelationship = await SpaceAndUserRelationship.create({
      space: space._id,
      user: createdBy,
      createdAt: new Date(),
    });
    space.save();
    await uploadPhoto(request.file.filename, 'icon');

    response.status(201).json({
      spaceAndUserRelationship: {
        _id: spaceAndUserRelationship._id,
        space: {
          _id: space._id,
          name: space.name,
          icon: space.icon,
          contentType: space.contentType,
        },
      },
    });

    // tagを作る。
    // {icon: '', name: '', color: ''} // defaultでは、iconは無しでいい。
    // const tagObjects = JSON.parse(tags).map((tag) => {
    //   return {
    //     icon: '',
    //     name: tag,
    //     color: '',
    //   };
    // });
    // const tagDocuments = await Tag.insertMany(tagObjects);
    // const tagIds = tagDocuments.map((tag) => tag._id);
    // const tagSpaceRels = tagIds.map((tagId) => {
    //   return {
    //     tag: tagId,
    //     space: space._id,
    //   };
    // });
    // space.tags = tagIds;

    // const tagAndSpaceRelationships = await TagAndSpaceRelationship.insertMany(tagSpaceRels);
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
    const space = await Space.findById(request.params.spaceId)
      .populate({
        path: 'reactions',
        model: 'Reaction',
        populate: {
          path: 'sticker',
          model: 'Sticker',
        },
      })
      .populate({
        path: 'createdBy',
        model: 'User',
        select: '_id name avatar',
      });
    response.status(200).json({
      space,
    });
  } catch (error) {
    console.log(error);
  }
};
