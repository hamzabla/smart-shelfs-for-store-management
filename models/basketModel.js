const mongoose = require("mongoose");

const basketSchema = mongoose.Schema(
    {

        products:{
            type: mongoose.Schema.Types.Array,
            required: true,
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

module.exports = mongoose.model("Basket", basketSchema);
