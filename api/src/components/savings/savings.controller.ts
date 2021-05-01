import { RequestHandler } from 'express'
import Saving from './Saving.model'

export const getSavings: RequestHandler = async (req, res) => {
    try {
        const savings = await Saving.find()
        return res.json(savings)
    } catch (error) {
        throw new Error("Savings were not found")
    }
}

export const getSaving: RequestHandler = async (req, res) => {
    try {
        const saving = await Saving.findById(req.params.id)
        if (!saving) return res.status(204).json()
        return res.status(200).json(saving)
    } catch (error) {
        throw new Error("saving was not found")
    }
}

export const createSavings: RequestHandler = async (req, res) => {
    try {
        const saving = new Saving(req.body)
        const savedSaving = await saving.save()
        console.log('The following saving was created and saved:', savedSaving)
        res.json(savedSaving)
    } catch (error) {
        throw new Error("saving was not registered")
    }
}

export const deleteSaving: RequestHandler = async (req, res) => {
    try {
        const savingDeleted = await Saving.findByIdAndDelete(req.params.id)
        if (!savingDeleted) return res.status(204).json()
        return res.json(savingDeleted)
    } catch (error) {
        throw new Error("saving was not deleted")
    }
}

export const updateSaving: RequestHandler = async (req, res) => {
    try {
        const savingUpdated = await Saving.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!savingUpdated) return res.status(204).json()
        return res.json(savingUpdated)
    } catch (error) {
        throw new Error("saving was not updated")
    }
}
