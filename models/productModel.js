const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please add product name"],
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    // shelf: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Shelf"
    // },
    // row: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Row"
    // },
    aisle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aisle"
    },
    productDescription: {
      type: String,
      required: false
    },
    productPrice: {
      type: Number,
      required: [true, "Please enter the product price"]
    },
    productSKU: {
      type: String,
      required: false
    },
    stockState:{
        type: String,
        default: "IN"
    }

  },
  {
    toJSON:{
      transform: function (doc,ret) {
          ret.productId = ret._id.toString();
          delete ret._id;
      }
    }
  },  
  { timestamps: true }
  
);

module.exports = mongoose.model("Product", productSchema);
