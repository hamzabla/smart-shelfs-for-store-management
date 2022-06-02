const express = require('express');
const router = express.Router();
const csvtojson = require("csvtojson");
const Aisle = require("../models/aisleModel");

const { getAllAisles,getAisleById,createAisle, updateAisle, deleteAisle }= require('../controllers/aisles');

router.get("/:id", getAisleById).get("/",getAllAisles).post("/",createAisle).put("/:id",updateAisle).delete("/:id",deleteAisle);

// router.post("/add", async (req,res)=>{

//     // CSV file name
//     const fileName = "aisles.csv";
//     csvtojson().fromFile(fileName).then(source => {
//         // Fetching the all data from each row
//             Aisle.insertMany(source).then(function () {
//             res.json({success:true});
//         });
//     });
//     }
// );
module.exports = router;