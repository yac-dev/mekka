import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';

export const getMySpaces = async (request, response) => {
  try {
    // spaceがnullのやつは除く。inner left
    const documents = await SpaceAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'space',
      select: '_id name icon contentType',
    });

    const spaceAndUserRelationships = documents.filter((relationship) => relationship.space !== null);
    response.status(200).json({
      spaceAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
