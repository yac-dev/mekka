import Post from '../models/post';
import Content from '../models/content';
import ReactionStatus from '../models/reactionStatus';
import { uploadPhoto } from '../services/s3';

export const createPost = async (request, response) => {
  try {
    // postで、reactionを全部持っておかないとね。
    const { caption, createdBy, location, spaceId, reactions } = request.body;
    const parsedLocation = JSON.parse(location);
    const parsedReactions = JSON.parse(reactions);
    const files = request.files;
    const createdAt = new Date();
    const contentIds = [];
    for (let file of files) {
      const content = await Content.create({
        data: `https://mekka-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/${
          file.mimetype === 'image/jpeg' ? 'photos' : 'videos'
        }/${file.filename}`,
        type: file.mimetype === 'image/jpeg' ? 'photo' : 'video',
        createdBy,
        createdAt,
      });
      contentIds.push(content._id);
      uploadPhoto(file.filename, content.type);
    }
    // 2, 作ったcontentsを、今度はpostに入れる。
    const post = await Post.create({
      contents: contentIds,
      caption,
      space: spaceId,
      location,
      createdBy,
      createdAt,
    });

    // objectを作って、insertManyをする感じか。
    const reacionStatusObjects = parsedReactions.map((reactionId) => {
      return {
        post: post,
        reaction: reactionId,
        count: 0,
      };
    });
    const reactionAndStatuses = await ReactionStatus.insertMany(reacionStatusObjects);

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (request, response) => {
  try {
    const posts = await Post.find({ space: request.params.spaceId })
      .select({ _id: true, contents: true, caption: true, spaceId: true, createdBy: true, createdAt: true })
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
    response.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
