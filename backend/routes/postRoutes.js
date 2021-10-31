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
	console.log("GET WALL POSTS BY USER ID")
	try{
		const posts = await Post.find({ ownerUserId: req.params.id})
		res.send(posts)
	}
	catch{
		res.status(404)
		res.send({error: "No posts for such owner"})
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
	})
	await post.save()
	res.send(post)
})

router.patch("/posts/:id", async(req, res) => {
	console.log("patch update post", req.params.id, req.session.user.id)
	const postId = req.params.id
	const userId = req.session.user.id
	try{
		console.log("Post.findOne", postId)
		const post = await Post.findOne({_id: postId})
		if(post){
			if(req.body.message){ // edit post
				post.message = req.body.message
				await post.save()
				res.send(post)
			}
			else if(userId){ // like forward|back
				var find
				if(post.likeIds.length > 0){
					find = post.likeIds.find(item => item === userId)
				}
				if(find){ // take your like back
					post.likeIds = post.likeIds.filter(item => item !== userId);
					console.log("post.likeIds after filter", post.likeIds)
				}
				else {
					post.likeIds.push(userId) // like post
				}
			}
			await post.save() // if post exists then edit&save
			res.send(post)
			console.log("post saved and sent")
		}
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