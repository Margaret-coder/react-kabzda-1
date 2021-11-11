const express = require("express")
const User = require("../models/User")
const saveEmptyProfile = require("./routeUtils")
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

router.post('/image', upload.single('image'), (req, res, err) => {
    console.log('POST IMAGE')
    console.log("req.session.user.avaPath", req.session.user.avaPath)
    console.log("req.session.user.id", req.session.user.id)
    console.log('req.body.userId', req.body.userId)
    const image = req.file.filename
    console.log('image', image)
    const id = req.body.userId
    if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else{
        User.findOne({_id: id}, function(err, user){
            if(user) {
				console.log('User:::', user)
                user.avaPath = image
                user.save(function(err){
                    try{
                        user.save()
                    }
                    catch(err){
                        console.log(err)
                        return res.send('/image', {
                            errors:err.errors,
                            user: user
                        })
                    }
                })
            }
            else {
                console.log("upload image error: user not found")
            }
            console.log("user to send", user)
            req.session.user.avaPath = user.avaPath
            console.log("req.session.user.avaPath", req.session.user.avaPath)
            res.send(user)
        })
    }
})

/* create session in browser */
const createSession = (user, req, res) => {
    let sessionUser = {}
    sessionUser.id = user._id
    console.log('user:::', user)
    sessionUser.email = user.email
    sessionUser.avaPath = user.avaPath
    req.session.user = sessionUser
    res.session = req.session
    return res    
}

router.get("/me", async(req, res) => {
    console.log('AUTH router /me')
    // console.log('REQ.SESSION', req.session)
    if (req.session&&req.session.user) {
        res.send(req.session.user)
    } 
    else {
        console.log("no auth data")
        res.send(false)
    }
}) 

/*Create new User and Profile account. Registration and login*/
router.post("/registration", async(req, res) => {
    console.log("post /users new user")
    console.log('post req.body', req.body)
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    console.log('New USER registration', user)
    try{
        console.log("try user save")
        await user.save()
    }
    catch (err){
        console.log("ERROR:",err)
        console.log("END_ERR")
        return res.status(500).send(err)
    }
    res = createSession(user, req, res)
    saveEmptyProfile(res.session.user.id)
    res.send(user)
})

router.get('/login', async(req,res) => {
    console.log('Login form get request')
    res.send('get login')
})

router.post("/login", async(req, res) => {
    console.log("===============================================================")
    console.log("/login")
    console.log("/LOGIN")
	try{
        User.findOne({email: req.body.email}, function(err, user){
            if(err) throw err
            else{
                if(user){
                    user.comparePassword(req.body.password, function(err, isMatch){
                    try{
                        if(err) {
                            throw err
                        }
                        if(!isMatch){
                            console.log('No match')
                            return res.status(403).json({message:"Wrong password"})
                        }
                        else{
                            createSession(user, req, res)
                            // res.send(user)
    console.log('/api/profile ::: GET PROFILE BY AUTH DATA')

                            res.redirect('/api/profile')
                        }
                    }
                    catch(e){
                        console.log("catch:", e.message)
                    }
                })
            }  
            else {
                console.log("User not found")
                return res.status(403).json({message:"User not found"})
            }
        }
        })
	}
	catch(err){
		res.status(404)
		res.send({err: "Not found"})
	}
})

router.delete('/login', async(req, res) => {
    console.log("/login delete request")
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
      res.send('delete session')
    })
})

module.exports = router