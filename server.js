const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log("MongoDB connected Successfully");
})
.catch((error) => {
    console.log("MongoDB failed to connect", error);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost${PORT}`);
})