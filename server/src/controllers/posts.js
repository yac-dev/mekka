import Post from '../models/post';

export const createPost = async (request, response) => {
  try {
    // requestで、multerからのfileがどう来るか、まだ知らんな。。。ここね。
    // filesに対して、contentsのdocumentsを作る感じか。
    // その作ったdocumentsをpostのcontsntsに入れる。
    const { contents, caption, createdBy, location } = request.body;
    // data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
    // const post = await Post.create({
    //   content: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
    //   caption,
    //   createdBy,
    //   location,
    // });
    console.log('working here..');

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
