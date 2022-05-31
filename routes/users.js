const express = require('express');
const router = express.Router();

const { getUserById,getAllUsers,createUser,updateUser,deleteUser } = require('../controllers/users');

router.get("/:id", getUserById).get("/",getAllUsers).post("/",createUser).put("/:id",updateUser).delete("/:id",deleteUser);

module.exports = router;