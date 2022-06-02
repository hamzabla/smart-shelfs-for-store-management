const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypto = require("crypto");
const fs = require("fs");
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    telephone,
    role
  } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !telephone ||
    !firstName ||
    !lastName ||
    !role
  ) {
   req.smartShelf = {errorCode: "missing required values"}
   next();
   return;
  }

  // Check if user exists
  const userExists =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (userExists) {
    req.smartShelf = {errorCode: "Account already exist"}
    next();
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      telephone,
      firstName,
      lastName,
      role
    });
    if (user) {
      res.status(201).json({
        success: true,
        operation: "register",
        data: {
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    }
});
    } else {
        req.smartShelf = {errorCode: "invalid user data"}
        next();
        return;
    
    }
  } catch (err) {
    req.smartShelf = {errorCode: "invalid user data"}
    next();
    return;

  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    
      res.json({
        success: true,
        operation: "login",
        data:{
        _id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
  }
});
    
  } else {
    req.smartShelf = {errorCode: "invalid user creds"}
    next();
    return;
  }
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  login,
};
