const mongoose = require('mongoose');
const url = process.env.MONGO_DB_URL

const connectDB = async() => {
    await mongoose.connect(url)
    console.log("Mongo Atlas DB connected!");
}

module.exports = connectDB;