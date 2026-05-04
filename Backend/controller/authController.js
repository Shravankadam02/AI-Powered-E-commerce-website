import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";



const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userexists = await User.findOne({ email });
        if (userexists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        
        let token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({ message: "User registered successfully", user});

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
} 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        let token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, password: "" });
        }
        let token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({ message: "Google login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { register, login, logout, googleLogin };