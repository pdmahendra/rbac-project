import { Router } from "express";
const router = Router()

import {
    registerPage,
    loginPage,
    login,
    register,
    logout
} from '../controllers/auth.controller.js'
import { verifyJwt,ensureLoggedout } from "../middleware/auth.middleware.js";

router.route('/register').get(ensureLoggedout,registerPage);
router.route('/register').post(ensureLoggedout,register);
router.route('/login').get(ensureLoggedout,loginPage);
router.route('/login').post(ensureLoggedout,login);
router.route('/logout').get(verifyJwt,logout);

export default router