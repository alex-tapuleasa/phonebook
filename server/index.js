require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const contactRoutes = require('./routes/contacts');

connectDB();

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/contacts', contactRoutes)

app.use('/api/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log("Server running on port 5000!")
  })