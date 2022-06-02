const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(".env");
const morgan = require("morgan");
const { errorHandler,endPointNotFound} = require('./middlewares/errorHandler');
const connectDB = require("./helpers/mongoHandler");
const cors = require("cors");
const port = process.env.PORT || 5000;

const auth = require('./routes/auth');
const users = require('./routes/users');
const categories = require('./routes/categories');
const products = require('./routes/products');
const shelves = require('./routes/shelves');
const rows = require('./routes/rows');
const aisles = require('./routes/aisles');
const reunion = require('./routes/reunion');
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/categories',categories);
app.use('/api/v1/products',products);
app.use('/api/v1/shelves',shelves);
app.use('/api/v1/rows',rows);
app.use('/api/v1/aisles',aisles);
app.use('/api/v1/reunion',reunion);
app.use('*',endPointNotFound);


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
