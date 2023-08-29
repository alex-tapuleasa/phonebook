require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const contactRoutes = require('./routes/contacts');

connectDB();

const app = express();

// const corsOptions = {
//   // origin: 'http://localhost:5000',
//   // methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//   // allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Access-Control-Allow-Origin'],
//   // exposedHeaders: ['Set-Cookie', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
//   credentials: true
// }

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/:id/contacts', contactRoutes)

app.use('/api/auth', require('./routes/auth'))

app.use('/api/users', require('./routes/private'))



app.listen(5000, () => {
    console.log("Server running on port 5000!")
  })