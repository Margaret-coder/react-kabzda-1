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
    console.log("GET AUTHORIZED PROFILE")
    if(req.session.user){
        Profile.findOne({userId: req.session.user.id}, function(err, profile) {
            console.log("req.session.user.id", req.session.user.id)
            if(profile) {
                console.log(profile)
                res.send(profile)
            }
            else if(err) res.send(err)
            else res.send(null)
        })
    }
    else res.send(null)
})

router.get('/profiles', async(req, res) => {
    console.log("GET ALL PROFILES")
    const profiles = await Profile.find()
    res.send(profiles)
})

router.post('/profile/edit_profile', upload.single('image'), (req, res, err) => {
    console.log("POST EDIT/CREATE PROFILE")
//    console.log("req.session.user.id create profile", req.session.user.id) // session in not available in formData req
    console.log("req.body", req.body)
    const image = req.file.filename
    const id = req.body.userId
    console.log('User id', id)
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
                console.log("upload image error: profile not found")
                const profile = new Profile ({
                    userId: id,
                    avaPath: image,
                    status: req.body.status,
                    aboutMe: req.body.aboutMe,
                    contacts: req.body.contacts,
                    lookingForJob: req.body.lookingForJob,
                    LFJobDescription: req.body.jobDescription,
                    fullname: req.body.fullname
                })
                try{
                    profile.save()
                }
                catch(err){
                    console.log(err)
                }
                console.log("profile to send", profile)
                res.send(profile)
            }
        })
    }
})

router.post('/profile/image', upload.single('image'), (req, res, err) => {
    console.log('POST IMAGE')
  //  console.log("req.session.user.id image", req.session.user.id)
    const image = req.file.filename
    console.log('image', image)
    const id = req.body.userId
    if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else{
        Profile.findOne({userId: id}, function(err, profile){
            if(profile) {
                profile.avaPath = image
                profile.save(function(err){
                    try{
                        profile.save()
                    }
                    catch(err){
                        console.log(err)
                        return res.send('/image', {
                            errors:err.errors,
                            profile: profile
                        })
                    }
                })
            }
            else {
                console.log("upload image error: profile not found")
            }
            console.log("profile to send", profile)
            res.send(profile)
        })
    }
})
module.exports = router