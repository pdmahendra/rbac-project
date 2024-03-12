import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = User

const registerPage = async (req, res) => {
    res.render('register')
};

const loginPage = async (req, res) => {
    // res.send("login page")
    res.render('login')
}

const login = async (req, res) => {
    // res.send("login Post")
    const { email, password } = req.body

    if (!(email && password)) {
        return res.status(400).json({ message: "All fields required" })
    };

    const user = await users.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "User with this Email does not exist" })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid user credentials" })
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    const loggedInUser = await User.findById(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", token, options)
        .json({ message: "User logged In Successfully", user: loggedInUser },
        )
}

const register = async (req, res) => {
    // res.send("register post")
    const { email, password } = req.body

    if (!(email && password)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: `User with email ${email} already exists` });
    }

    const user = await users.create({
        email,
        password
    })

    if (!user) {
        return res.status(500).json({ message: "User Registration failed" });
    }

    return res.status(201).json({ message: "User registered successfully", user });
    // res.render('register', {
    //     email: req.body.email,
    //     // messages: req.flash(),
    // });
    // return;
}

const logout = async (req, res) => {
    res.send("logout")
}

export {
    registerPage,
    loginPage,
    login,
    register,
    logout
}