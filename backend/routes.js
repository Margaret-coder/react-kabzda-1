const express = require("express")
const Post = require("./models/Post")
const router = express.Router()

router.get("/posts", async(req, res) => {
    const posts = await Post.find()
    res.send(posts)
})

router.get("/posts/:id", async(req, res) => {
	try{
	const post = await Post.findOne({ _id: req.params.id})
	res.send(post)
	}
	catch{
		res.status(404)
		res.send({error: "No post with such id"})
	}
})

router.post("/posts", async (req, res) => {
	const post = new Post({
		message: req.body.message,
		likesCount: 0
	})
	await post.save()
	res.send(post)
})

router.patch("/posts/:id", async(req, res) => {
	try{
		const post = await Post.findOne({_id: req.params.id})
		if(req.body.message){
			post.message = req.body.message
		}
		if(req.body.likesCount){
			post.likesCount = req.body.likesCount
		}
		await post.save()
		res.send(post)
	}
	catch {
		res.status(404)
		res.status({error: "Post doesn't exist!"})
	}
})

router.delete("/posts/:id", async(req, res) => {
	try{
		await Post.deleteOne({_id: req.params.id})
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({error: "Not possible to delete post due to wrong id number"})
	}
})

module.exports = router