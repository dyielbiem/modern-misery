
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import router
const backendRoutes = require('./routes/router');

// express app
const app = express();

const corsOptions = {
    origin: 'https://modernmisery.netlify.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Allow frontend to access the backend server
app.use(cors(corsOptions))


// middleware for identifying HTTP requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// middleware to parse JSON from HTTP requests
app.use(express.json());


// use all the routes
app.use('/api/entries', backendRoutes);

// Establish the connection to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    //listen on port
    app.listen(process.env.PORT, () => {
        console.log(`Connected to database and listening on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("Error: ", error);
});

