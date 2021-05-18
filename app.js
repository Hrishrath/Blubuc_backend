const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {DBConnection} = require('./dbConn')
const app = express();

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/user')
const blogRoutes = require('./Routes/blog')
const categoryRoutes = require('./Routes/category')


require('dotenv').config();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", categoryRoutes);

//app.use(authRoutes);

app.get("/", (req, res) => {
return res.send("HEllo Rishabh");
})

app.listen(process.env.PORT,  () => {
    DBConnection();
    console.log("Listening at port: ",process.env.PORT);
})


