const express = require("express");
const dotenv = require("dotenv/config");
const morgan = require("morgan");
const dbConnection = require("./config/dbConnect");
const url = process.env.URL;
const userUrl = `${url}/user`;
const postUrl = `${url}/user`;
const categoryUrl = `${url}/user`;
const commentUrl = `${url}/user`;
const port = process.env.PORT || 6000;

//import routers
const userRouter = require("./routes/users/users");
const postRouter = require("./routes/posts/posts");
const commentRouter = require("./routes/comments/comments");
const categoryRouter = require("./routes/categories/categories");
const errorHandler = require("./middlewares/globalErrorHandler");
const isAdmin = require("./middlewares/isAdmin");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(userUrl, userRouter);
app.use(postUrl, postRouter);
app.use(categoryUrl, categoryRouter);
app.use(commentUrl, commentRouter);

app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ message: `${req.originalUrl}- is not found` });
});
app.use(isAdmin);


app.listen(port, () => console.log(`server started at port ${port}`));
