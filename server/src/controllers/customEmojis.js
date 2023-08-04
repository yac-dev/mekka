import CustomEmoji from '../models/customEmoji';

export const getCustomEmojis = async (request, response) => {
  try {
    const customEmojis = await CustomEmoji.find();
    response.status(200).json({
      customEmojis,
    });
  } catch (error) {
    console.log(error);
  }
};
