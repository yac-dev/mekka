import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (password.length < 10) {
      return next(new AppError('Password has to be at least 10 characters long.', 400, 'PasswordLengthError'));
    }
    const user = new User({
      name,
      email,
      password,
      createdAt: new Date(),
      pushToken: '',
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
    response.status(201).send({
      user,
      jwt: jwtToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadMe = async (request, response) => {
  try {
    const { user } = request;
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
