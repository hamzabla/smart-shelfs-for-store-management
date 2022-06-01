const Row = require("../models/rowModel");


const createRow = async (req, res, next) => {
    const {
        rowCapacity,
        shelves
    } = req.body;

    if (!rowCapacity || !shelves) {
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
        const row = await Row.create({
            rowCapacity,
            shelves
        });
        res.status(201).json({
            success: true,
            operation: "add new row",
            data: {
                row
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateRow = async (req, res, next) => {
    const {id}= req.params;
    const {
        rowCapacity,
        shelves
    } = req.body;

    if  (!rowCapacity || !shelves) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let row = await Row.findOneAndUpdate({ _id: id }, {
            rowCapacity,
            shelves
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating row",
                data: {
                    row
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getRowById = async (req, res, next) => {
    const { id } = req.params;
    let row = await Row.findById(id);
    if (row) {
        res.status(200).json(
            {
                success: true,
                operation: "getting row by id",
                data: {
                    row
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "row not exist" }
        next();
        return;
    }

};

const getAllRows = async (req, res, next) => {
    let rows = await Row.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all rows ",
            count: rows.length,
            data: {
                rows
            }

        }
    );
};

const deleteRow = async (req, res, next) => {
    const { id } = req.params;
    let row = await Row.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete row ",
            data: {
                row
            }

        }
    );
};

module.exports = { getAllRows,getRowById,createRow, updateRow, deleteRow };