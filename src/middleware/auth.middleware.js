import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyJwt = async (req,res,next) => {
    const token = req.cookies.accessToken || req.header('Authorization').split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized request" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.id);
    req.user = user
    next()
}