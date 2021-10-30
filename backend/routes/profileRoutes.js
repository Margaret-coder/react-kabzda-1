const express = require("express")
const Profile = require("../models/Profile")
const router = express.Router()
const multer = require("multer")
const { connection } = require("mongoose")
const saveEmptyProfile = require("./routeUtils")
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
    console.log('ROUTER GET STATUS by id:',req.params.id)
    if(req.params&&req.params.id){
        Profile.findOne({userId: req.params.id}, function(err, profile){ //req.userId
            if(profile) {
                res.send(profile.status)
            }
            else {
                console.log("GET PROFILE res.send(null)")
                res.send(null)
            }
        })
    }
})

router.get('/profile', async(req, res) => {
    console.log('GET PROFILE BY AUTH DATA')
    if(req.session&&req.session.user) { 
        Profile.findOne({userId: req.session.user.id}, function(err, profile) {
            if(profile) {
                req.session.user.login = profile.fullname
                req.session.user.avaPath = profile.avaPath
                console.log('REQ SESSION USER', req.session.user)
                res.send(profile)
            }
            else {
                console.log('PROFILE NULL')
                res.send(null)
            }
        })
    }
    else console.log('NO PROFILE. req.session:::', req.session)
})

router.get('/profile/:id', async(req, res) => {
    console.log('GET PROFILE BY ID')
    if(req.params.id) { 
        Profile.findOne({userId: req.params.id}, function(err, profile) {
            if(profile) {
                res.send(profile)
            }
            else {
                console.log('No profile res.send(null)')
                res.send(null)
            }
        })
    }
    else console.log('NO PROFILE. req.params.id:::', req.params.id)
})

router.post('/profile', async(req, res) => {
    console.log("CREATE NEW PROFILE")
    console.log("req.body.id", req.body.id)
    console.log('req.session.user', req.session.user)
    const id = req.session.user ? req.session.user.id : req.body.id
    console.log('id', id)
    if(id){
        const profile = saveEmptyProfile(id)
        res.send(profile)
    }
    else {
        console.log("no user created")
        res.send("no user created")
    }
})

router.get('/profiles', async(req, res) => {
    console.log("GET ALL PROFILES")
    const profiles = await Profile.find()
    res.send(profiles)
})

router.post('/profile/edit_profile', upload.single('image'), (req, res, err) => {
    console.log("POST EDIT/CREATE PROFILE")
//    console.log("req.session.user.id create profile", req.session.user.id) // session in not available in formData req
//ss    console.log("req.body", req.body)
    const image = req.file?req.file.filename:''
    const id = req.body.userId
    console.log('User id', id)
    if(req.file&&!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else{
        Profile.findOne({userId: id}, function(err, profile){
            if(profile) {
                profile.avaPath = image?image:profile.avaPath
                profile.status = req.body.status,
                profile.aboutMe = req.body.aboutMe,
                profile.contacts = req.body.contacts,
                profile.lookingForJob = req.body.lookingForJob,
                profile.LFJobDescription = req.body.jobDescription,
                profile.fullname = req.body.fullname
                profile.save(function(err){
                    if(err){
                        return res.status(412).send({
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
    console.log("req.session.user.avaPath", req.session.user.avaPath)
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
            req.session.user.avaPath = profile.avaPath
    console.log("req.session.user.avaPath", req.session.user.avaPath)

            res.send(profile)
        })
    }
})
module.exports = router