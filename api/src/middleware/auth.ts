import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Token } from '../components/auth/auth.interfaces';
import config from '../config/default';

const auth: RequestHandler = (req, res, next) => {
  const token: Token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};

export default auth;
