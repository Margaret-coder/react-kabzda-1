const express = require("express")
const User = require('../models/User')
const router = express.Router()

router.get("/users", async(req, res) => {
	console.log("get all users")
    const users = await User.find()
    res.send(users)
})

router.get("/users/:username", async(req, res) => {
	console.log("get single user by username")
	try{
        const user = await User.findOne({ _id: req.params.username})
        User.findOne({username: req.params.username}, function(err, user){
            if(err) throw err
            user.comparePassword('password123', function(err, isMatch){
               if(err) throw err
               console.log("password123", isMatch) 
            })
        })
        res.send(user)
	}
	catch{
		res.status(404)
		res.send({error: "No post with such id"})
	}
    User.findOne({username: 'test111'}, function(err, user){
        if(err) throw err
        user.comparePassword('password123', function(err, isMatch){
            if(err) throw err
            console.log('password123: ', isMatch)
        })

        // user.comparePassword('password123', function(err, isMatch){
        //     if(err) throw err
        //     console.log('123pasword', isMatch)
        // })
    })

})

router.post("/users", async (req, res) => {
    console.log("post new user")
    console.log("req body email", req.body.email)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    console.log("req.username:", user.username, "req.email:", user.email, "req.pass:", user.password)
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

module.exports = router