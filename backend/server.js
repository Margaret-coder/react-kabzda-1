
const express = require("express")
const mongoose = require("mongoose")
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
mongoose
    .connect("mongodb://localhost:27017/socialNetworkDB", 
    {useNewUrlParser: true}, { useUnifiedTopology: true })
    .then(() => {
        const app = express()
        app.use(cors())
        app.use(express.json());
        app.use("/api", postRoutes)
        app.use("/api", userRoutes)
        app.use(function(req, res, next) {
            console.log("hello inside server console")
            console.log("req.body:", req.body)
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Origin: http://localhost:3000')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
          });
        app.listen(5500, () => {
            console.log("Server has started! Nodemon")
    })
})