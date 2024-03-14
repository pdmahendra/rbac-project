import { Router } from "express";
const router = Router()
import { profile } from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';

router.route('/profile').get(verifyJwt, profile)

export default router;