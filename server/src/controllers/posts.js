import Post from '../models/post';

export const createPost = async (request, response) => {
  try {
    // multiple contentsを投稿できるようにしたいよね。
    // videoとphoto、二つ分けないといけないよな。。。
    // まあ、content一つでいっか。
    const { content, caption, createdBy, location } = request.body;
    // data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
    const post = await Post.create({
      content: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
      caption,
      createdBy,
      location,
    });

    response.status(201).json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
};
