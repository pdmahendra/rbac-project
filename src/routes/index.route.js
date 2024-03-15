import { Router } from "express";
const router = Router()

import { index } from '../controllers/index.controller.js'

import { verifyJwt } from "../middleware/auth.middleware.js";

router.route('/').get(verifyJwt, index)

export default router