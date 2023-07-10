import User from '../models/user';

export const signup = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    response.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
