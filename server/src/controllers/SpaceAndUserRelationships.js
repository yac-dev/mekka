import SpaceAndUserRelationship from '../models/spaceAndUserRelationship';

export const getMySpaces = async (request, response) => {
  try {
    const spaceAndUserRelationships = await SpaceAndUserRelationship.find({ user: request.params.userId }).populate({
      path: 'space',
      select: '_id name icon',
    });

    response.status(200).json({
      spaceAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
