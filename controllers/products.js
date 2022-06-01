const Product = require("../models/productModel");


const createProduct = async (req, res, next) => {
    const {
        productName,
        category,
        productDescription,
        productPrice,
        productSKU,
        stockState
    } = req.body;

    if (!productName ||
        !category ||
        !productDescription ||
        !productPrice ||
        !productSKU 
        ) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if product exists
    const productExists = (await Product.findOne({ productName }));
    if (productExists) {
        req.smartShelf = { errorCode: "product already exist" }
        next();
        return;
    }

    try {
        const product = await Product.create({
            productName,
            category,
            productDescription,
            productPrice,
            productSKU,
            stockState
        });
        res.status(201).json({
            success: true,
            operation: "add new product",
            data: {
                product
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateProduct = async (req, res, next) => {
    const {id}= req.params;
    const {
        productName,
        category,
        productDescription,
        productPrice,
        productSKU,
        stockState
    } = req.body;

    if (!productName ||
        !category ||
        !productDescription ||
        !productPrice ||
        !productSKU 
        ){
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let product = await Product.findOneAndUpdate({ _id: id }, {
            productName,
            category,
            productDescription,
            productPrice,
            productSKU,
            stockState
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating product",
                data: {
                    product
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (product) {
        res.status(200).json(
            {
                success: true,
                operation: "getting product by id",
                data: {
                    product
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "product not exist" }
        next();
        return;
    }

};

const getAllProducts = async (req, res, next) => {
    let products = await Product.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all products ",
            count: products.length,
            data: {
                products
            }

        }
    );
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete product ",
            data: {
                product
            }

        }
    );
};

module.exports = { getAllProducts,getProductById,createProduct, updateProduct, deleteProduct };