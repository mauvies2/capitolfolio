import { Router } from 'express'
import savingsRoutes from '../components/savings/savings.routes'

const router = Router()

router.get('/', (req, res) => res.json('home'))

router.use('/savings', savingsRoutes)

export default router