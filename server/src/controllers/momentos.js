import Momento from '../models/momento';

export const createMomento = async (request, response) => {};

export const getMomentosBySpaceId = async (request, response) => {
  try {
    const momentos = await Momento.find({ space: request.params.spaceId });
    response.status(200).json({
      momentos,
    });
  } catch (error) {
    console.log(error);
  }
};
