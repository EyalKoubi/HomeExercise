"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginValidation_1 = require("../validations/loginValidation");
const USERS = {
    admin: "admin",
    user: "user",
};
const login = (req, res) => {
    // Validate the incoming request using Joi schema
    const { error } = loginValidation_1.loginSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    const { username, password } = req.body;
    // Check if the credentials match the hardcoded users
    if (USERS[username] && USERS[username] === password) {
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    // If credentials are invalid
    res.status(401).json({ error: "Invalid username or password" });
};
exports.login = login;
