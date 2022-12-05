const express = require("express");
const dotenv = require("dotenv/config");
const morgan = require("morgan");
const dbConnection = require("./config/dbConnect");
const url = process.env.URL;

const app = express();

const port = process.env.PORT || 6000;

//import routers
const userRouter = require("./routes/users/users");

app.use(express.json());
app.use(morgan("tiny"));
app.use(`${url}/user`, userRouter);

app.listen(port, () => console.log(`server started at port ${port}`));
