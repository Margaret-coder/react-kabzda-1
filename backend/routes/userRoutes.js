const express = require("express")
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
        res.send("User already exists", user)
        console.log("ERROR:",err)
        console.log("END_ERR")
    }
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

module.exports = router