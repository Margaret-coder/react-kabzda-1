const express = require("express")
const User = require('../models/User')
const router = express.Router()

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

router.get("/users", async(req, res) => {
	console.log("get all users")
    const users = await User.find()
    console.log('users', users)
    res.send(users)
})

module.exports = router