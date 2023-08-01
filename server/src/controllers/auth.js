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

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Nooooo.mail');
    }
    console.log(user);

    const isEnteredPasswordCorrect = await user.isPasswordCorrect(password, user.password);
    if (!isEnteredPasswordCorrect) {
      throw new Error('password not match...');
    }

    // 基本、10dayにしましょう。expirationは。
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
    response.json({
      user,
      jwt: jwtToken,
    });
  } catch (error) {
    console.log(error.message, error.name);
    response.status(400).send({
      message: 'OOPS! Something wrong with your email or password. Please enter your email and password again.',
    });
  }
};
