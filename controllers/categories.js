const Category = require("../models/categoryModel");


const createCategory = async (req, res, next) => {
    const {
        categoryName,
        categoryDescription
    } = req.body;

    if (!categoryName || !categoryDescription) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }

    // Check if category exists
    const categoryExists = (await Category.findOne({ categoryName }));
    if (categoryExists) {
        req.smartShelf = { errorCode: "category already exist" }
        next();
        return;
    }

    try {
        const category = await Category.create({
            categoryName,
            categoryDescription
        });
        res.status(201).json({
            success: true,
            operation: "add new category",
            data: {
                category
            }
        });
    
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const updateCategory = async (req, res, next) => {
    const {id}= req.params;
    const {
        categoryName,
        categoryDescription
    } = req.body;

    if (!categoryName && !categoryDescription) {
        req.smartShelf = { errorCode: "missing required values" }
        next();
        return;
    }
    try{
        let category = await Category.findOneAndUpdate({ _id: id }, {
            categoryName,
            categoryDescription
        },{ returnOriginal: false },);
    
        res.status(200).json(
            {
                success: true,
                operation: "updating category",
                data: {
                    category
                }
    
            });
    }catch(err) {
        req.smartShelf = { errorCode: err.code }
        next();
        return;

    }
};

const getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    let category = await Category.findById(id);
    if (category) {
        res.status(200).json(
            {
                success: true,
                operation: "getting category by id",
                data: {
                    category
                }

            }
        );
    } else {
        req.smartShelf = { errorCode: "category not exist" }
        next();
        return;
    }

};

const getAllCategories = async (req, res, next) => {
    let categories = await Category.find({});
    res.status(200).json(
        {
            success: true,
            operation: "getting all categories ",
            count: categories.length,
            data: {
                categories
            }

        }
    );
};

const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    let category = await Category.findByIdAndDelete(id);
    res.status(200).json(
        {
            success: true,
            operation: "delete category ",
            data: {
                category
            }

        }
    );
};

module.exports = { getAllCategories,getCategoryById,createCategory, updateCategory, deleteCategory };