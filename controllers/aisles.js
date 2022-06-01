const Aisle = require("../models/aisleModel");


const createAisle = async (req, res, next) => {
    const {
        aisleCapacity,
        rows
    } = req.body;

    if (!aisleCapacity || !rows) {
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
        const aisle = await Aisle.create({
            aisleCapacity,
            rows
        });
        res.status(201).json({
            success: true,
            operation: "add new aisle",
            data: {
                aisle
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateAisle = async (req, res, next) => {
    const {id}= req.params;
    const {
        aisleCapacity,
        rows
    } = req.body;

    if  (!aisleCapacity || !rows) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let aisle = await Aisle.findOneAndUpdate({ _id: id }, {
            aisleCapacity,
            rows
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating aisle",
                data: {
                    aisle
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getAisleById = async (req, res, next) => {
    const { id } = req.params;
    let aisle = await Aisle.findById(id);
    if (aisle) {
        res.status(200).json(
            {
                success: true,
                operation: "getting aisle by id",
                data: {
                    aisle
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "aisle not exist" }
        next();
        return;
    }

};

const getAllAisles = async (req, res, next) => {
    let aisles = await Aisle.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all aisles ",
            count: aisles.length,
            data: {
                aisles
            }

        }
    );
};

const deleteAisle = async (req, res, next) => {
    const { id } = req.params;
    let aisle = await Aisle.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete aisle ",
            data: {
                aisle
            }

        }
    );
};

module.exports = { getAllAisles,getAisleById,createAisle, updateAisle, deleteAisle };