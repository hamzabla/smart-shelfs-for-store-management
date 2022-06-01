const express = require('express');
const router = express.Router();

const { getAllCategories,getCategoryById,createCategory, updateCategory, deleteCategory }= require('../controllers/categories');

router.get("/:id", getCategoryById).get("/",getAllCategories).post("/",createCategory).put("/:id",updateCategory).delete("/:id",deleteCategory);

module.exports = router;