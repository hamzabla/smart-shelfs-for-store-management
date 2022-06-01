const express = require('express');
const router = express.Router();

const { getAllRows,getRowById,createRow, updateRow, deleteRow }= require('../controllers/rows');

router.get("/:id", getRowById).get("/",getAllRows).post("/",createRow).put("/:id",updateRow).delete("/:id",deleteRow);

module.exports = router;