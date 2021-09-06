const Profile = require("../models/Profile")

const saveEmptyProfile = (id) =>{
    const profile = new Profile ({
        userId: id,
        avaPath: "",
        status: "",
        aboutMe: "",
        contacts: [],
        lookingForJob: false,
        LFJobDescription: "",
        fullname: ""
    })
    try{
        profile.save()
    }
    catch(err){
        console.log(err)
    }
    console.log("profile to send", profile)
    return profile
}

module.exports = saveEmptyProfile