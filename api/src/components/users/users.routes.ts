import { Router } from 'express'
import * as userCtrl from './users.controller'

const router = Router()

router.get('/', userCtrl.getUsers)

router.get('/:id', userCtrl.getUser)

router.post('/', userCtrl.registerUser)

router.delete('/:id', userCtrl.deleteUser)

router.put('/:id', userCtrl.updateUser)

router.post('/login', userCtrl.loginUser)

export default router

