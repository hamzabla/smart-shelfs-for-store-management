const Shelf = require("../models/shelfModel");


const createShelf = async (req, res, next) => {
    const {
        shelfCapacity,
        state,
        product,
        inShelfNumber
    } = req.body;

    if (!shelfCapacity || !state || !product || !inShelfNumber) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if shelf exists
    // const shelfExists = (await shelf.findOne({ shelfName }));
    // if (shelfExists) {
    //     req.smartShelf = { errorCode: "shelf already exist" }
    //     next();
    //     return;
    // }

    try {
        const shelf = await Shelf.create({
            shelfCapacity,
            state,
            product,
            inShelfNumber
        });
        res.status(201).json({
            success: true,
            operation: "add new shelf",
            data: {
                shelf
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateShelf = async (req, res, next) => {
    const {id}= req.params;
    const {
        shelfCapacity,
        state,
        product,
        inShelfNumber
    } = req.body;

    if  (!shelfCapacity || !state || !product || !inShelfNumber) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let shelf = await shelf.findOneAndUpdate({ _id: id }, {
            shelfCapacity,
            state,
            product,
            inShelfNumber
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating shelf",
                data: {
                    shelf
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getShelfById = async (req, res, next) => {
    const { id } = req.params;
    let shelf = await shelf.findById(id);
    if (shelf) {
        res.status(200).json(
            {
                success: true,
                operation: "getting shelf by id",
                data: {
                    shelf
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "shelf not exist" }
        next();
        return;
    }

};

const getAllShelves = async (req, res, next) => {
    let shelves = await Shelf.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all shelves ",
            count: shelves.length,
            data: {
                shelves
            }

        }
    );
};

const deleteShelf = async (req, res, next) => {
    const { id } = req.params;
    let shelf = await Shelf.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete shelf ",
            data: {
                shelf
            }

        }
    );
};

module.exports = { getAllShelves,getShelfById,createShelf, updateShelf, deleteShelf };