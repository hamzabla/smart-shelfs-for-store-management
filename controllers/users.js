const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let user = await User.findById(id);
    if (user) {
        res.status(200).json(
            {
                success: true,
                operation: "getting user by id",
                data: {
                    user
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "user not exist" }
        next();
        return;
    }

});

const getAllUsers = asyncHandler(async (req, res, next) => {
    let users = await User.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all users ",
            count: users.length,
            data: {
                users
            }

        }
    );
});


const createUser = asyncHandler(async (req, res, next) => {
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
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if user exists
    const userExists =
        (await User.findOne({ email })) || (await User.findOne({ username }));
    if (userExists) {
        req.smartShelf = { errorCode: "Account already exist" }
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
                operation: "add new user",
                data: {
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                }
            });
        } else {
            req.smartShelf = { errorCode: "invalid user data" }
            next();
            return;

        }
    } catch (err) {
        req.smartShelf = { errorCode: "invalid user data" }
        next();
        return;

    }
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        telephone
    } = req.body;

    if (
        !telephone ||
        !firstName ||
        !lastName
    ) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    let user = await User.findOneAndUpdate({ _id: id }, {
        firstName,
        lastName,
        telephone
    },{ returnOriginal: false },);

    res.status(200).json(
        {
            success: true,
            operation: "updating user",
            data: {
                user
            }

        });

});

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete user ",
            data: {
                user
            }

        }
    );
});


module.exports = { getUserById, getAllUsers, createUser,updateUser,deleteUser };