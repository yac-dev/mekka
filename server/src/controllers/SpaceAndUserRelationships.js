import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';

export const getMySpaces = async (request, response) => {
  try {
    // spaceがnullのやつは除く。inner left
    const spaceAndUserRelationships = await SpaceAndUserRelationship.find({
      user: request.params.userId,
      space: { $ne: null },
    }).populate({
      path: 'space',
      select: '_id name icon contentType',
    });

    response.status(200).json({
      spaceAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
