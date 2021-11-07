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

router.get("/users/follow/:id", async(req, res) => {
	const auth_uid = req.session.user.id
	const user_to_follow_id = req.params.id
	console.log("----Follow----", req.params.id)
	console.log('req.session.user', req.session.user.id)
	try{
		const user = await User.findOne({_id: user_to_follow_id})
		if(user){
			var followers = user.followers
			followers.push(auth_uid)
			user.followers = followers
			user.update({followers : followers})
			user.save()

		}
	}
	catch(e){
		console.log('Error', e)
	}
	try{
		const user = await User.findOne({_id: auth_uid})
		if(user){
			var following = user.following
			following.push(user_to_follow_id)
			user.update({following : following})
			user.save()
			res.jsonp(user)
		}
	}
	catch(e){
		console.log('Error', e)
	}
})

module.exports = router