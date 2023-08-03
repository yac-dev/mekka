import UserAndReactionRelationship from '../models/userAndReactionRelationships';
import ReactionStatus from '../models/reactionStatus';

export const createReaction = async (request, response) => {
  try {
    // どのpostにどのreactionを誰がしたかっていう話ね。
    // postにするってこと考えると、、、まあ、reactionを送る感じかな。
    const { userId, postId } = request.params;
    const { reactionId } = request.body;
    console.log(userId, postId);
    console.log(reactionId);

    const userAndReactionRelationship = await UserAndReactionRelationship.create({
      user: userId,
      post: postId,
      reaction: reactionId,
    });

    const reactionStatus = await ReactionStatus.findOne({ reaction: reactionId });
    reactionStatus.count++;
    reactionStatus.save();

    response.status(200).json({
      reactionStatus,
    });
  } catch (error) {
    console.log(error);
  }
};
