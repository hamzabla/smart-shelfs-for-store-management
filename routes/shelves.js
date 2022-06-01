const express = require('express');
const router = express.Router();

const { getAllShelves,getShelfById,createShelf, updateShelf, deleteShelf }= require('../controllers/shelves');

router.get("/:id", getShelfById).get("/",getAllShelves).post("/",createShelf).put("/:id",updateShelf).delete("/:id",deleteShelf);

module.exports = router;