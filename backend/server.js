const express = require('express');
const mongoose = require("mongoose")
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")
const { connection_string } = require('./config');
var session = require('express-session')
var MongoStore = require('connect-mongo');
var cookieParser = require('cookie-parser');

mongoose
    .connect(connection_string, 
    {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        const app = express()
        app.use(session({
            secret: 'i need more beers',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 3600000, secure: false, httpOnly: true },
            store: MongoStore.create({ 
                mongoUrl: "mongodb://localhost:27017/socialNetworkDB", //connection_string,
                autoRemove: 'disabled'
            })
        }))
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(cookieParser());
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });  
        app.use("/api", postRoutes)
        app.use("/api", userRoutes)
        app.listen(5500, () => {
            console.log("Server has started! Nodemon")
    })
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
  })