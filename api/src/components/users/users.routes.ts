import { Router } from 'express';
import auth from '../../middleware/auth';
import * as userCtrl from './users.controller';

const router = Router();

router.get('/', userCtrl.getUsers);

// auth

router.get('/:id', auth, userCtrl.getUser);

router.delete('/:id', auth, userCtrl.deleteUser);

router.put('/:id', auth, userCtrl.updateUser);

export default router;
