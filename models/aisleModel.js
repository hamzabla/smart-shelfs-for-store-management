const mongoose = require("mongoose");

const aisleSchema = mongoose.Schema(
    {
        aisleCapacity:{
            type: Number,
            required: true,
        },
        rows:{
            type: mongoose.Schema.Types.Array,
            required: true,
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Aisle", aisleSchema);
