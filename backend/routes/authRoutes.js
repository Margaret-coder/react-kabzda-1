const express = require("express")
const User = require("../models/User")
const router = express.Router()

router.get("/me", async(req, res) => {
    console.log('router /me')
    if (req.session&&req.session.user) {
        console.log('req.sessionID', req.sessionID)
        res.send(req.session.user)
    } 
    else {
        console.log("no auth data")
        res.send(false)
        //res.redirect('/api/login')
    }
}) 

router.get('/login', async(req,res) => {
    console.log('Login form get request')
    res.send('get login')
})

router.post("/login", async(req, res) => {
    console.log("/login")
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
                    }
                    catch(e){
                        console.log("catch:", e.message)
                    }
                    let sessionUser = {}
                    sessionUser.id = user._id
                    sessionUser.username = user.username
                    req.session.user = sessionUser
                    res.session = req.session
                    res.redirect('/api/profile')
                })
            }  
            else {
                console.log("Wrong data! User not found")
                res.send("Wrong input data, no match in db")
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
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
      res.redirect('/api/login')
    })
})

module.exports = router