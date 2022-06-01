const mongoose = require("mongoose");

const rowSchema = mongoose.Schema(
    {
        rowCapacity:{
            type: Number,
            required: true,
        },
        shelves:{
            type: mongoose.Schema.Types.Array,
            required: true,
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Row", rowSchema);
