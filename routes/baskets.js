const express = require('express');
const router = express.Router();
const csvtojson = require("csvtojson");
const Basket = require("../models/basketModel");

const { getAllBaskets,getBasketById,createBasket, updateBasket, deleteBasket }= require('../controllers/baskets');

router.get("/:id", getBasketById).get("/",getAllBaskets).post("/",createBasket).put("/:id",updateBasket).delete("/:id",deleteBasket);


router.post("/add", async (req,res)=>{

    // CSV file name
    const fileName = "basket.csv";
    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < 100; i++) {
            var oneRow = {
                products:[]
            };
            for(var j=1; j<21; j++){
                var value=source[i][`pr${j}`];
                if (value !== undefined && value !== null){
                    var oneProduct={
                        productName: value
                    }
                    console.log(oneProduct);
                    oneRow.products.push(oneProduct);

                }
            }
           
            arrayToInsert.push(oneRow);
        }
        
        Basket.insertMany(arrayToInsert).then(function () {
            res.json({success:true});
        });
    });
    }
);
module.exports = router;