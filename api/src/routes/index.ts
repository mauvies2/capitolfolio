import { Router } from 'express'

import savingsRoutes from '../components/savings/savings.routes'
import usersRoutes from '../components/users/users.routes'
import dashboardRoutes from '../components/dashboard/dashboard.routes'

const router = Router()

router.use('/savings', savingsRoutes)
router.use('/users', usersRoutes)
router.use('/dashboard', dashboardRoutes)

export default router