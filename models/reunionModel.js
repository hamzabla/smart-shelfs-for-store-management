const mongoose = require("mongoose");

const reunionSchema = mongoose.Schema(
    {
        reunionDate:{
            type: String,
            required: [true, "please add reunion date"],
            unique: true,
            
        },
        reunionObject:{
            type: String,
            required: true,
        }
    },
   
);

module.exports = mongoose.model("Reunion", reunionSchema);
