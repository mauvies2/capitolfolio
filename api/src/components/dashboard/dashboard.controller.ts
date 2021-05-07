import { RequestHandler } from 'express'

export const getDashboard: RequestHandler = (req, res) => {
    return res.json({ msg: 'You are successfully logged in' })
};