const mongoose = require("mongoose");

const aisleSchema = mongoose.Schema(
    {

        _id:{
            type:Number,
            required:true,
            unique:true
        },
        aisleCapacity:{
            type: Number,
            required: true,
        },
        aisleName: {
            type: String,
            required: true
        },
        rows:{
            type: mongoose.Schema.Types.Array,
            required: false,
        }
        
     },
    // {
    //   toJSON:{
    //     transform: function (doc,ret) {
    //         ret.aisleId = ret._id.toString();
    //         delete ret._id;
    //     }
    //   }
    // },  
    { timestamps: true }
);

module.exports = mongoose.model("Aisle", aisleSchema);
