import Space from '../models/space';
import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';
import Reaction from '../models/reaction';
import { uploadPhoto } from '../services/s3';
import Post from '../models/post';
import Tag from '../models/tag';

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

export const getPostsBySpaceId = async (request, response) => {
  try {
    const documents = await Post.find({
      space: request.params.spaceId,
      $or: [
        { disappearAt: { $gt: new Date() } }, // disapperAt greater than current time
        { disappearAt: null }, // disapperAt is null
      ],
      createdBy: { $ne: null }, // 存在しないuserによるpostはfetchしない。
    })
      .select({ _id: true, contents: true, caption: true, spaceId: true, createdBy: true, createdAt: true })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'contents',
          model: 'Content',
          select: '_id data type',
        },
        {
          path: 'createdBy',
          model: 'User',
          select: '_id name avatar',
        },
      ]);
    // postのidと、contents[0]のdata, typeだけ欲しい。
    // {post: postId, content: {data: "....", type: "video"}}
    const posts = documents.map((post, index) => {
      return {
        _id: post._id,
        content: {
          data: post.contents[0].data,
          type: post.contents[0].type,
        },
      };
    });

    response.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySpaceIdAndYearAndMonth = async (request, response) => {
  try {
    const { yearAndMonth } = request.params;
    const year = yearAndMonth.split('-')[0];
    const month = yearAndMonth.split('-')[1];

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    // const libraryAssets = [];
    const documents = await Post.find({
      space: request.params.spaceId,
      createdAt: { $gte: startDate, $lt: endDate },
      $or: [
        { disappearAt: { $gt: new Date() } }, // disapperAt greater than current time
        { disappearAt: null }, // disapperAt is null
      ],
      createdBy: { $ne: null },
    }).populate({
      path: 'contents',
      model: 'Content',
      select: '_id data type',
    });

    const posts = documents.map((post, index) => {
      return {
        _id: post._id,
        content: {
          data: post.contents[0].data,
          type: post.contents[0].type,
        },
        createdAt: post.createdAt,
      };
    });

    response.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTagsBySpaceId = async (request, response) => {
  try {
    // relationshipのtableでもないし、大丈夫か。
    const documents = await Tag.find({ space: request.params.spaceId });
    response.status(200).json({
      tags: documents,
    });
  } catch (error) {
    console.log(error);
  }
};
