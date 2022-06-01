const express = require('express');
const router = express.Router();

const { getAllProducts,getProductById,createProduct, updateProduct, deleteProduct }= require('../controllers/products');

router.get("/:id", getProductById).get("/",getAllProducts).post("/",createProduct).put("/:id",updateProduct).delete("/:id",deleteProduct);

module.exports = router;
