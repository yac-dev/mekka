import Moment from '../models/moment';

export const createMoment = async (request, response) => {};

export const getMomentsBySpaceId = async (request, response) => {
  try {
    const moments = await Moment.find({ space: request.params.spaceId });
    response.status(200).json({
      moments,
    });
  } catch (error) {
    console.log(error);
  }
};
