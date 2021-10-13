const express = require("express")
const User = require("../models/User")
const saveEmptyProfile = require("./routeUtils")
const router = express.Router()

/* create session in browser */
const createSession = (user, req, res) => {
    let sessionUser = {}
    sessionUser.id = user._id
    sessionUser.username = user.email
    req.session.user = sessionUser
    res.session = req.session
    return res    
}

router.get("/me", async(req, res) => {
    console.log('router /me')
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