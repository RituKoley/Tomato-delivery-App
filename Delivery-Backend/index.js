const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Load environment variables
dotEnv.config();

const PORT = process.env.PORT || 5174;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Ritu07:2hmZJyqWubfFjzAj@atlascluster.hva0wjn.mongodb.net/backend?retryWrites=true&w=majority&appName=AtlasCluster";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

// Server start
app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

// Default Route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to TOMATO</h1>");
});
