import Comment from '../models/comment';

export const createComment = async (request, response) => {
  try {
    const comment = await Comment.create({
      content: request.body.content,
      user: request.body.userId,
      post: request.body.postId,
      createdAt: new Date(),
    });

    response.status(201).json({
      comment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (request, response) => {
  try {
    const { postId } = request.params;
    const comments = await Comment.find({ post: postId });
    response.status(200).json({
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};
