import { Router } from 'express';
import * as dashboardCtrl from './dashboard.controller'
import auth from '../../middleware/auth'

const router = Router();

router.get('/', auth, dashboardCtrl.getDashboard);

export default router