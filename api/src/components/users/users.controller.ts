import { RequestHandler } from 'express';
import User from './Users.model';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ error: null, data: users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(204);
    return res.json({ error: null, data: user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    if (!userDeleted) return res.status(204);
    return res.json(userDeleted);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!userUpdated) return res.status(204);
    return res.json(userUpdated);
  } catch (error) {
    res.status(400).json({ error });
  }
};
