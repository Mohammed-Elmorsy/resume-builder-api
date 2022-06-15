const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const helmet = require("helmet");
const { emitNewRequests } = require("./middlewares/request-emitter.middleware");
const app = express();

const userRoutes = require("./routes/user.route");

const mongoUrl = `mongodb://morsy:${process.env.MONGO_ATLAS_PW}@cluster0-shard-00-00.g02w5.mongodb.net:27017,cluster0-shard-00-01.g02w5.mongodb.net:27017,cluster0-shard-00-02.g02w5.mongodb.net:27017/Dalia?ssl=true&replicaSet=atlas-4knigr-shard-0&authSource=admin&retryWrites=true&w=majority`;

async function connectToDb() {
    try {
        await mongoose.connect(mongoUrl);
    } catch (error) {
        console.log('db connection error', error);
    }
}

connectToDb();

// middleware to enable CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// middleware to secure app by setting various HTTP headers
app.use(helmet()); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
}); */

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUrl })
}));

// middleware to get each new request to be used in user.test to extract session from it
app.use(emitNewRequests); 

// app routes
app.use("/user", userRoutes);
app.use("/", (req, res) => {
    return res.send('Resume Builder Backend');
});

// global error handling middleware
app.use((err, req, res, next) => {
    console.log('error', err);
    return res.status(500).json({ message: err.customMessage || 'server error' });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));

module.exports = app;