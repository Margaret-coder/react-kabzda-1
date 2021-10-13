const express = require("express")
const Post = require("../models/Post")
const router = express.Router()

router.get("/posts", async(req, res) => {
	console.log("GET POSTS FOR LOGGED IN PROFILE")
	console.log('req.session.user.id:::', req.session.user.id)
    const posts = await Post.find({ownerUserId : req.session.user.id})
    res.send(posts)
})

router.get("/posts/:id", async(req, res) => {
	console.log("get wall posts by user id")
	try{
	const posts = await Post.findOne({ ownerUserId: req.params.id})
	res.send(posts)
	}
	catch{
		res.status(404)
		res.send({error: "No post with such id"})
	}
})

router.post("/posts", async (req, res) => {
	var authorUserId
	var ownerUserId
    if(req.session&&req.session.user){
		console.log("Post new message req.session.user", req.session.user.id)
		authorUserId = req.session.user.id
	}
	if(req.body) {
		console.log("Post new message req.body.userId", req.body.userId)
		ownerUserId = req.body.userId
	}
	console.log("post new message")
	const post = new Post({
		ownerUserId: ownerUserId,
		authorUserId: authorUserId,
		message: req.body.message,
		likesCount: 0
	})
	await post.save()
	res.send(post)
})

router.patch("/posts/:id", async(req, res) => {
	console.log("patch update post")
	try{
		const post = await Post.findOne({_id: req.params.id})
		if(req.body.message){
			post.message = req.body.message
			await post.save()
			res.send(post)
			console.log("Post was sent")
		}
		if(req.body.user_id){
			// console.log("Hello from patch user_id")
			var find
			console.log('req.body.user_id',req.body.user_id)
			if(post.likeIds.length > 0){
				find = post.likeIds.find(item => item === req.body.user_id)
				console.log("find", find)
			}
			if(find){ // take your like back
				console.log("found", find)
				post.likeIds = post.likeIds.filter(item => item !== req.body.user_id);
				console.log("post.likeIds after filter", post.likeIds)
				post.likesCount = post.likeIds.length
			}
			else {
				console.log('adding')
				post.likeIds.push(req.body.user_id)
				post.likesCount = post.likeIds.length
			}
		}
		await post.save()
		res.send(post)
		console.log("post saved and sent")
	}
	catch {
		res.status(404)
		res.status({error: "Post doesn't exist!"})
	}
})

router.delete("/posts/:id", async(req, res) => {
	console.log("delete post")
	try{
		const post = await Post.findOne({_id: req.params.id})
		await Post.deleteOne({_id: req.params.id})
		res.send(post)
		//res.status(204).send(post)
	} catch {
		res.status(404)
		res.send({error: "Not possible to delete post due to wrong id number"})
	}
})

module.exports = router