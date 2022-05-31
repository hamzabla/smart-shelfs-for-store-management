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
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('*',endPointNotFound);


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
