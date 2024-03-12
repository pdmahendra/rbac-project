import { Router } from "express";
const router = Router()

import {
    registerPage,
    loginPage,
    login,
    register,
    logout
} from '../controllers/auth.controller.js'

router.route('/register').get(registerPage);
router.route('/register').post(register);
router.route('/login').get(loginPage);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router