const express = require("express")
//const { createDispatchHook } = require("react-redux")
const User = require('../models/User')
const router = express.Router()

/*Create new user*/
router.post("/users", async(req, res) => {
    console.log("post /users new user____")
    console.log('post req.body', req.body)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        console.log("try user save")
        await user.save()
    }
    catch (err){
        res.send("User already exists")
        console.log("ERROR:",err)
        console.log("END_ERR")
    }
    console.log("user.username:", user.username, "user.email:", user.email, "user.pass:", user.password)
    res.send(user)
})

router.delete("/users/:id", async(req, res) => {
	console.log("delete user")
	try{
		const user = await User.findOne({_id: req.params.id})
		await User.deleteOne({_id: req.params.id})
		res.send(user)
		//res.status(204).send(post)
	} catch {
		res.status(404)
		res.send({error: "Not possible to delete user due to wrong id number"})
	}
})
// router.get("/users", async(req, res) => {
// 	console.log("get all users")
//     const users = await User.find()
//     res.send(users)
// })

router.get("/me", async(req, res) => {
	console.log("!/me auth user req GET method")
    if (!req.session) {
        console.log("No session")
       // res.send('FUCK YOU');
       res.redirect('/login')
        console.log('/me session:', req.session);
    } 
    else {
        console.log("!!!")
        console.log("SESSION EXISTS:", req.session.username)
    }
}) 

router.post("/login", async(req, res) => {
    res.cookie('connect.sid', req.sessionID, { maxAge: 86400000, httpOnly: true, domain: 'localhost:3000' })
    console.log("req.sessionID", req.sessionID)
	try{
        User.findOne({email: req.body.email}, function(err, user){
            if(err) throw err
            else{
                if(user){
                user.comparePassword(req.body.password, function(err, isMatch){
                    try{
                        if(err) {
                            console.log("SHIT no isMatch") 
                            throw err
                        }
                    }
                    catch(e){
                        console.log("catch:", e.message)
                    }
                    req.session.username = user.username
                    res.session = req.session
                    res.send(user)
                })
            }
            else {
                console.log("Wrong data! User not found")
                res.send("Wrong data")
            }
        }
        })
	}
	catch(err){
		res.status(404)
		res.send({err: "Not found"})
	}
})



module.exports = router