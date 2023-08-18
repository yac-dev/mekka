import Tag from '../models/tag';

export const getTags = async (request, response) => {
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
