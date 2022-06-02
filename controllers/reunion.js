const Reunion = require("../models/reunionModel");


const createReunion = async (req, res, next) => {
    const {
        reunionDate,
        reunionObject
    } = req.body;

    if (!reunionDate || !reunionObject) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if category exists
    const reunionExists = (await Reunion.findOne({ reunionDate }));
    if (reunionExists) {
        req.smartShelf = { errorCode: "reunion already exist" }
        next();
        return;
    }

    try {
        const reunion = await Reunion.create({
            reunionDate,
            reunionObject
        });
        res.status(201).json({
            success: true,
            operation: "add new reunion",
            data: {
                reunion
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateReunion = async (req, res, next) => {
    const {id}= req.params;
    const {
        reunionDate,
        reunionObject
    } = req.body;

    if (!reunionDate && !reunionObject) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let reunion= await Reunion.findOneAndUpdate({ _id: id }, {
            reunionDate,
            reunionObject
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating reunion info",
                data: {
                    reunion
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getReunionById = async (req, res, next) => {
    const { id } = req.params;
    let reunion = await Reunion.findById(id);
    if (reunion) {
        res.status(200).json(
            {
                success: true,
                operation: "getting reunion by id",
                data: {
                    reunion
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "reunion not exist" }
        next();
        return;
    }

};

const getAllReunions = async (req, res, next) => {
    let reunions = await Reunion.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all reunions ",
            count: reunions.length,
            data: {
                reunions
            }

        }
    );
};

const deleteReunion = async (req, res, next) => {
    const { id } = req.params;
    let reunion = await Reunion.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete reunion ",
            data: {
                reunion
            }

        }
    );
};

module.exports = { getAllReunions,getReunionById,createReunion, updateReunion, deleteReunion };