import Router from 'express';
import * as authCtrl from './auth.controller';

const router = Router();

router.post('/', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

export default router;
