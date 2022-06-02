const express = require('express');
const router = express.Router();

const { getAllReunions,getReunionById,createReunion, updateReunion, deleteReunion }= require('../controllers/reunion');

router.get("/:id", getReunionById).get("/",getAllReunions).post("/",createReunion).put("/:id",updateReunion).delete("/:id",deleteReunion);

module.exports = router;