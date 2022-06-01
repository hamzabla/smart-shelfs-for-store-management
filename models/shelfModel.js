const mongoose = require("mongoose");

const shelfSchema = mongoose.Schema(
    {
        productCapacity:{
            type: Number,
            required: true,
            
        },
        state:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shelf", shelfSchema);
