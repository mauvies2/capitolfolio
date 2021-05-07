import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/default'
// middleware to validate token
const auth: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

export default auth;