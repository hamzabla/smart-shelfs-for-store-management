const Basket = require("../models/basketModel");

const createBasket = async (req, res, next) => {
    const {
        products
    } = req.body;

    if (!products) {
        req.smartshelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if row exists
    // const rowExists = (await row.findOne({ rowName }));
    // if (rowExists) {
    //     req.smartrow = { errorCode: "row already exist" }
    //     next();
    //     return;
    // }

    try {
        const basket = await Basket.create({
            products
        });
        res.status(201).json({
            success: true,
            operation: "add new Basket",
            data: {
                basket
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateBasket = async (req, res, next) => {
    const {id}= req.params;
    const {
        products
    } = req.body;

    if  (!products ) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let basket = await Basket.findOneAndUpdate({ _id: id }, {
            products
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating Basket",
                data: {
                    basket
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getBasketById = async (req, res, next) => {
    const { id } = req.params;
    let basket = await Basket.findById(id);
    if (basket) {
        res.status(200).json(
            {
                success: true,
                operation: "getting Basket by id",
                data: {
                    basket
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "Basket not exist" }
        next();
        return;
    }

};

const getAllBaskets = async (req, res, next) => {
    let baskets = await Basket.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all Baskets ",
            count: baskets.length,
            data: {
                baskets
            }

        }
    );
};

const deleteBasket = async (req, res, next) => {
    const { id } = req.params;
    let basket = await Basket.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete Basket ",
            data: {
                basket
            }

        }
    );
};

module.exports = { getAllBaskets,getBasketById,createBasket, updateBasket, deleteBasket };