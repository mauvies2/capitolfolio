import { RequestHandler } from 'express'

export const getSavings: RequestHandler = (req, res) => {
    res.json('savings')
}

export const getSaving: RequestHandler = (req, res) => {
    res.json('saving')
}

export const createSavings: RequestHandler = (req, res) => {
    res.json('create savings')
}

export const deleteSaving: RequestHandler = (req, res) => {
    res.json('delete savings')
}

export const updateSaving: RequestHandler = (req, res) => {
    res.json('update saving')
}
