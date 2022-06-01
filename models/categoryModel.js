const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        categoryName:{
            type: String,
            required: [true, "please add category name"],
            unique: true,
            
        },
        categoryDescription:{
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
