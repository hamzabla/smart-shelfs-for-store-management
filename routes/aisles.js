const express = require('express');
const router = express.Router();

const { getAllAisles,getAisleById,createAisle, updateAisle, deleteAisle }= require('../controllers/aisles');

router.get("/:id", getAisleById).get("/",getAllAisles).post("/",createAisle).put("/:id",updateAisle).delete("/:id",deleteAisle);

module.exports = router;