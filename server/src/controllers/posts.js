import Space from '../models/space';
import Post from '../models/post';
import Content from '../models/content';
import ReactionStatus from '../models/reactionStatus';
import Tag from '../models/tag';
import PostAndTagRelationship from '../models/postAndTagRelationships';
import { uploadPhoto } from '../services/s3';

export const createPost = async (request, response) => {
  try {
    // postで、reactionを全部持っておかないとね。
    const { caption, createdBy, location, spaceId, reactions, addedTags, createdTags, disappearAfter } = request.body;
    console.log(disappearAfter);
    const disappearAt = new Date(new Date().getTime() + Number(disappearAfter) * 60 * 1000);
    // 現在の時間にdissaperAfter(minute)を足した日時を出す。
    const parsedLocation = JSON.parse(location);
    const parsedReactions = JSON.parse(reactions);
    const parsedTags = JSON.parse(addedTags);
    const parsedCreatedTags = JSON.parse(createdTags);
    const files = request.files;
    const createdAt = new Date();
    const contentIds = [];
    const contents = [];

    // 1 contentsを作る。
    // clientからspaceのdisapperを送ればいい。単純に。
    for (let file of files) {
      const content = await Content.create({
        data: `https://mekka-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/${
          file.mimetype === 'image/jpeg' ? 'photos' : 'videos'
        }/${file.filename}`,
        type: file.mimetype === 'image/jpeg' ? 'photo' : 'video',
        createdBy,
        createdAt,
      });
      contents.push(content);
      contentIds.push(content._id);
      await uploadPhoto(file.filename, content.type);
    }
    // そもそも、これspaceもfetchしなきゃいけないよな。。。こういうの、すげー効率がなー。

    // 2,postを作る
    const post = await Post.create({
      contents: contentIds,
      caption,
      space: spaceId,
      location: parsedLocation,
      disappearAt,
      createdBy,
      createdAt,
    });

    // 3 reactionのstatusを作る。
    const reacionStatusObjects = parsedReactions.map((reactionId) => {
      return {
        post: post,
        reaction: reactionId,
        count: 0,
      };
    });
    const reactionAndStatuses = await ReactionStatus.insertMany(reacionStatusObjects);

    const tagIds = [];

    // 4 新しいtagを作る、もし、createdTagsがあったら。
    if (parsedCreatedTags.length) {
      const tagObjects = parsedCreatedTags.map((tagName) => {
        return {
          name: tagName,
          count: 1,
          space: spaceId,
        };
      });
      const tagDocuments = await Tag.insertMany(tagObjects);
      tagDocuments.forEach((tagDocument) => {
        tagIds.push(tagDocument._id);
      });
    }

    // だから、client側ではtagのidだけを入れておく感じな。
    if (parsedTags.length) {
      parsedTags.forEach((tagId) => {
        tagIds.push(tagId);
      });
    }

    // tagIdsをもとにpostAndTagのrelationshipを作る、もちろん最終的にtagIdsのlengthがあったらね。
    if (tagIds.length) {
      const postAndTagRelationshipObjects = tagIds.map((tagId) => {
        return {
          post: post._id,
          tag: tagId,
        };
      });

      const postAndTagRelationshipDocuments = await PostAndTagRelationship.insertMany(postAndTagRelationshipObjects);
    }

    response.status(201).json({
      post: {
        _id: post._id,
        content: {
          data: contents[0].data,
          type: contents[0].type,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (request, response) => {
  try {
    const document = await Post.findById(request.params.postId)
      .populate({
        path: 'contents',
        model: 'Content',
        select: '_id data type',
      })
      .populate({
        path: 'createdBy',
        model: 'User',
        select: '_id name avatar',
      });

    response.status(200).json({
      post: document,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const getPosts = async (request, response) => {
//   try {
//     const documents = await Post.find({
//       space: request.params.spaceId,
//       $or: [
//         { disappearAt: { $gt: new Date() } }, // disapperAt greater than current time
//         { disappearAt: null }, // disapperAt is null
//       ],
//       createdBy: { $ne: null }, // 存在しないuserによるpostはfetchしない。
//     })
//       .select({ _id: true, contents: true, caption: true, spaceId: true, createdBy: true, createdAt: true })
//       .sort({ createdAt: -1 })
//       .populate([
//         {
//           path: 'contents',
//           model: 'Content',
//           select: '_id data type',
//         },
//         {
//           path: 'createdBy',
//           model: 'User',
//           select: '_id name avatar',
//         },
//       ]);
//     // postのidと、contents[0]のdata, typeだけ欲しい。
//     // {post: postId, content: {data: "....", type: "video"}}
//     const posts = documents.map((post, index) => {
//       return {
//         _id: post._id,
//         content: {
//           data: post.contents[0].data,
//           type: post.contents[0].type,
//         },
//       };
//     });

//     response.status(200).json({
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
