const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userId: String,
    avaPath: String,
    status: String,
    aboutMe:String,
    contacts: String,
    lookingForJob: Boolean,
    LFJobDescription: String,
    fullname: String  
})

module.exports = mongoose.model("Profile", profileSchema)