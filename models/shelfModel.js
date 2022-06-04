const mongoose = require("mongoose");

const shelfSchema = mongoose.Schema(
    {
        shelfCapacity:{
            type: String,
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
            type: String,
            required: true
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shelf", shelfSchema);
