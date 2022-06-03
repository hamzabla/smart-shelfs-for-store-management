const mongoose = require("mongoose");

const shelfSchema = mongoose.Schema(
    {
        shelfCapacity:{
            type: Number,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        inShelfNumber:{
            type: Number,
            required: true
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shelf", shelfSchema);
