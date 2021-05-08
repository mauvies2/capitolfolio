import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { Token } from './auth.interfaces';
import User, { encryptPassword, validatePassword } from '../users/Users.model';
import config from '../../config/default';

export const registerUser: RequestHandler = async (req, res) => {
  const userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    return res
      .status(200)
      .json({ error: `User with email ${req.body.email} already exists` });
  }

  const password = encryptPassword(req.body.password);
  try {
    const user = new User({ ...req.body, password });
    const userCreated = await user.save();
    return res.json(userCreated);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Email is not registered' });

  const validPassword = validatePassword(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: 'Password is incorrect' });

  const token: Token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    config.JWT_SECRET,
    { expiresIn: 20 }
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
    },
  });
};
