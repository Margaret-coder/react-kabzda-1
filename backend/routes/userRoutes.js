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

router.get("/me", async(req, res) => {
    console.log('router /me')
    if (req.session&&req.session.user) {
        console.log('req.sessionID', req.sessionID)
        res.send(req.session.user)
    } 
    else {
        console.log("no data, redirect to login")
        res.send('no data')
    }
}) 

router.post("/login", async(req, res) => {
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
    req.logout();
    res.redirect('/');
})

module.exports = router