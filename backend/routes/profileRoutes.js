const express = require("express")
const Profile = require("../models/Profile")
const router = express.Router()
const multer = require("multer")
const { connection } = require("mongoose")
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

router.patch('/profile/status', async(req, res) => {
    console.log('Router PATCH')
    if(req.session&&req.session.user){
        Profile.findOne({userId: req.session.user.id}, function(err, profile){
            if(profile) {
                profile.status = req.body.status
                profile.save(function(err){
                    if(err){
                        return res.send('/status', {
                            errors:err.errors,
                            profile: profile
                        })
                   }
                    else {
                        res.jsonp(profile)
                    }
                })
            }
            else res.send(null)
        })
    }
})

router.get('/profile/status/:id', async(req, res) => {
    if(req.session&&req.session.user){
        Profile.findOne({userId: req.session.user.id}, function(err, profile){ //req.userId
            if(profile) {
                res.send(profile.status)
            }
            else res.send(null)
        })
    }
})

router.get('/profile/:id', async(req, res) => {
    if(req.session&&req.session.user) { 
        Profile.findOne({userId: req.session.user.id}, function(err, profile) {
            if(profile) res.send(profile)
            else res.send(null)
        })
    }
})

router.get('/profile', async(req, res) => {
    console.log("GET PROFILE PAGE")
    res.send("GET")
})

router.post('/profile', async(req, res) => {
    console.log("POST PROFILE")
    console.log("req.body", req.body)
    const profile = new Profile ({
        userId: req.body.userId,
        avaPath: req.body.avaPath,
        status: req.body.status,
        aboutMe: req.body.aboutMe,
        contacts: req.body.contacts,
        lookingForJob: req.body.lookingForJob,
        LFJobDescription: req.body.LFJobDescription,
        fullname: req.body.fullname
    })
    try{
        profile.save()
    }
    catch(err){
        console.log(err)
        res.send(profile)
    }
    res.send("POST")
})

router.get('/profile/image/:id', (req, res) => {
    const id = req.params.id
    const sqlInsert = "SELECT * FROM images WHERE id = ?"
    connection.query(sqlInsert, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({msg: err})
        }
        if(result){
            res.send({image: result[0].image})
        }
    })
})

router.post('/profile/image', upload.single('image'), (req, res, err) => {
    //console.log("router post profile image", req.session, req.sessionID)
    console.log("req.body.userId", req.body.userId)
    const image = req.file.filename
    const id = req.body.userId
    if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else{
        Profile.findOne({userId: id}, function(err, profile){
            if(profile) {
                profile.avaPath = image
                profile.save(function(err){
                    if(err){
                        return res.send('/image', {
                            errors:err.errors,
                            profile: profile
                        })
                   }
                    else {
                        res.jsonp(profile)
                    }
                })
            }
            else {
                console.log("Profile not found")
                const profile = new Profile ({
                    userId: id,
                    avaPath: image,
                    status: "",
                    aboutMe: "",
                    contacts: "",
                    lookingForJob: false,
                    LFJobDescription: "",
                    fullname: ""
                })
                //res.send(null)
                try{
                    profile.save()
                }
                catch(err){
                    console.log(err)
                    res.send(profile)
                }
            }
        })
        // const image = req.file.filename
        // const id = req.body.userId
        // const sqlInsert = "UPDATE images SET `image` = ? WHERE id = ?"

        // connection.query(sqlInsert, [image, id], (err, result) => {
        //     if (err) {
        //         console.log(err)
        //         res.send({
        //             msg: err
        //         })
        //     }

        //     if(result) {
        //         res.send({
        //             data: result,
        //             msg: 'Your image has been updated'
        //         })
        //     }
        // })
    }
})
module.exports = router