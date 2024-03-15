import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split("Bearer ")[1]);
        if(!token){
            return res.redirect('/auth/login')
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.id);
        res.locals.user = user
        req.user = user
        next()
    } catch (error) {
        if (error.message === 'jwt expired') {
            res.clearCookie('accessToken');
            res.redirect('/auth/login')
        }
    }
}

export const ensureLoggedout = async (req, res, next) => {
if(!req.cookies.accessToken){
    next()
}else{
    return res.redirect('/user/profile')
}
}
