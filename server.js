const express = require("express");
const connectDB = require('./db');
const cors = require("cors")
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
// env config
dotenv.config();
const PORT = process.env.PORT || 3000;

// rest object
const app = express()
connectDB();

//routes import
const userRoutes = require('./routes/userRoute');

// middelware 
app.use(cors());
app.use(cookieParser()); // To get cookie data
app.use(express.json()); // To get body data

// routes for API

app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
