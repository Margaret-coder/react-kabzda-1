const express = require('express');
const mongoose = require("mongoose")
const multer = require("multer")
const postRoutes = require("./routes/postRoutes")
const usersRoutes = require("./routes/usersRoutes")
const profileRoutes = require("./routes/profileRoutes")
const authRoutes = require("./routes/authRoutes")
const { connection_string } = require('./config');
const path = require('path');
var session = require('express-session')
var MongoStore = require('connect-mongo');
var cookieParser = require('cookie-parser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./")
    },
    filename: function(req, file, cb){
        const ext = file.mimetype.split("/")[1]
        cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`)
    }
})
const upload = multer({
    storage: storage
})

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
        app.use('/', express.static(path.join(__dirname, '/')));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(cookieParser());
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Credentials', true);
            if (req.method === "OPTIONS") {
                return res.status(200).end();
            }
            next();
        });  
        app.use("/api", postRoutes)
        app.use("/api", usersRoutes)
        app.use("/api", profileRoutes)
        app.use("/api", authRoutes)
        app.listen(5500, () => {
            console.log("Server has started! Nodemon")
    })
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
  })