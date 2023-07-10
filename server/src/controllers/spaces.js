import Space from '../models/space';

// type付も、最初から完璧でなくともいいぞ。
export const createSpace = async (request, response) => {
  try {
    const {
      name,
      // thumbnail,
      contentType,
      // videoLength,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      createdBy,
      // reactions,
      // tags,
    } = request.body;

    const space = await Space.create({
      name,
      contentType,
      isPublic,
      isCommentAvailable,
      isReactionAvailable,
      createdBy,
      createdAt: new Date(),
    });

    response.status(201).json({
      space,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSpaces = async (request, response) => {
  try {
    const spaces = await Space.find({});
    response.status(200).json({
      spaces,
    });
  } catch (error) {
    console.log(error);
  }
};
