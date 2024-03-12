import User from '../models/user.model.js'
import bcrypt from 'bcrypt';

const users = User

const registerPage = async (req, res) => {
    res.render('register')
};

const loginPage = async (req, res) => {
    // res.send("login page")
    res.render('login')
}

const login = async (req, res) => {
    res.send("login Post")
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

    // return res.status(201).json({ message: "User registered successfully", user });
    res.render('register', {
        email: req.body.email,
        // messages: req.flash(),
      });
      return;
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