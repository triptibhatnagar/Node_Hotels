// CONNECT NODE SERVER AND MONGODB SERVER - USING MONGOOSE
// import mongoose
const mongoose = require('mongoose');
require('dotenv').config()

// define mongodb url
// const mongoURL = ''; // local url
const mongoURL = process.env.MONGODB_URL_LOCAL; // online url -> connect to online cluster
// const mongoURL = process.env.MONGODB_URL; // online url -> connect to online cluster

// setup mongodb connection
// useNewUrlParser, useUnifiedTopology - mandatory config options
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// default connection object
// mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// define event listeners
db.on('connected', () => {
    console.log("MongoDB server connected successfully")
});
db.on('error', (err) => {
    console.log("Some error occured", err)
});
db.on('disconnected', () => {
    console.log("MongoDB disconnected")
});

// export the database connection
module.exports = db;

// after exporting, you can import it and use it in other parts of Node.js applicaion