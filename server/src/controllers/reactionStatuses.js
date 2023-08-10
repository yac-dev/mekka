import Reaction from '../models/reaction';
import ReactionStatus from '../models/reactionStatus';

export const getReactionStatuses = async (request, response) => {
  try {
    const reactionStatuses = await ReactionStatus.find({
      post: request.params.postId,
    }).populate({
      path: 'reaction',
      model: 'Reaction',
      populate: {
        path: 'sticker',
        model: 'Sticker',
      },
    });

    response.status(200).json({
      reactionStatuses,
    });
  } catch (error) {
    console.log(error);
  }
};
