const express = require('express');
const app = express();
const error=require("./src/middlewares/errorHandlerMiddleware");
const BookRouter=require("./src/Routes/BookRoute");
const usersRoute=require('./src/Routes/usersRoute');
const dotenv = require('dotenv');
const UserRoute=require('./src/Routes/usersRoute');
const ConnectDb=require("./src/config/dbConnect");

dotenv.config();
ConnectDb();


//Passing body data
app.use(express.json());


//Books
app.use('/api/books', BookRouter);

app.use('/api/users',UserRoute);

//Error handler middleware
app.use(error.errorHandlerMiddleware);

//Server
const PORT =  process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is up and runing ${PORT}`);
});
