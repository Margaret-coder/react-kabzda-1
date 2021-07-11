const express = require("express")
const Profile = require("../models/Profile")
const router = express.Router()

router.get('/profile/:id', async(req, res) => {
    if(req.session) { 
        Profile.findOne({userId: req.session.user.id}, function(err, profile) {
            console.log("GET PROFILE:", profile)
            if(profile) res.send(profile)
            else res.send("Profile not found")
        })
    }
})

router.post('/profile', async(req, res) => {
    console.log("POST PROFILE")
    console.log("req.body", req.body)
    res.send("POST")
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
})

module.exports = router