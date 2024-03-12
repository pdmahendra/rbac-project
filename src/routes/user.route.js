import { Router } from "express";
const router = Router()
import { profile } from '../controllers/user.controller.js'

router.route('/profile').get(profile)

export default router;