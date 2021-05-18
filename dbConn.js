const mongoose = require('mongoose');
require('dotenv').config();

 exports.DBConnection = () => {
    mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log("Databse Connected") )
.catch((err) => console.log("Databse Connection Failed ", err))
}