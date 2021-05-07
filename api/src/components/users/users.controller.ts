import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/default'


import User, { encryptPassword, validatePassword } from './Users.model'

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find()
        return res.json({ error: null, data: users })
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const getUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(204)
        return res.json({ error: null, data: user })
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const registerUser: RequestHandler = async (req, res) => {
    const userAlreadyExists = await User.findOne({ email: req.body.email })

    if (userAlreadyExists) {
        return res.status(200).json({ error: `User with email ${req.body.email} already exists` })
    }

    const password = encryptPassword(req.body.password);
    try {
        const user = new User({ ...req.body, password})
        const userCreated = await user.save()
        return res.json(userCreated)
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const loginUser: RequestHandler = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    
    const validPassword = validatePassword(req.body.password, user.password);
    if (!validPassword) 
        return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign(
        {
            name: user.name,
            id: user._id,
        },
        config.JWT_SECRET
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
    });

  }

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id)
        if (!userDeleted) return res.status(204)
        return res.json(userDeleted)
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!userUpdated) return res.status(204)
        return res.json(userUpdated)
    } catch (error) {
        res.status(400).json({ error });
    }
}