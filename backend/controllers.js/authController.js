
import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import pkg from 'jsonwebtoken';        
const { sign } = pkg;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     console.log(`sign rout hit `);
     console.log(req.body);
    // 1. Validate missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
    }

    // 3. Validate password strength
    // At least 8 chars, 1 letter, 1 number
    // const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passRegex.test(password)) {
    //   return res.status(400).json({ error: "WEAK_PASSWORD" });
    // }

    // 4. Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ error: "USER_EXISTS" });
    }

    // 5. Hash password
    const hashedPassword = await hash(password, 10);

    // 6. Auto-generate unique userId (like professional SaaS platforms)
    const userId = "USR-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // 7. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userId
    });

    // 8. Respond
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: newUser.userId,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log("🔥 HIT ROUTE:", req.method, req.url);
     console.log(`email is ${email}`);

    // === Email format validation ===
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
    }

    // === Check if user exists ===
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    // === Password check ===
    const isMatch = await compare(password, user.password);
    if (!isMatch) { 
      return res.status(400).json({ error: "WRONG_PASSWORD" });
    }

    // === JWT Token ===
    const token = sign(
      { id: user._id, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      userId: user.userId,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};


export default { signup, login };