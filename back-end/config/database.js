require('dotenv').config()
const mongoose = require("mongoose");

exports.connect = () => {

    try {
        mongoose.connect(process.env.DB_URL,{
            authSource: "admin",
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect to DB success!')
    } catch (error) {
        console.log("Error DB connection: ", error)
    }

}