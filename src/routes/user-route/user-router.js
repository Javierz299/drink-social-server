const express = require('express');

const UserService = require('./user-service');

const UserRouter = express.Router();

//This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads
const bodyParser = express.json();

UserRouter
    .post('/post/userprofile',bodyParser, (req,res,next) => { 
        // add new user to db
        const { name, email } = req.body
        console.log("REQ BODY",req.body);
        const newUser = {
            username: name,
            email
        }

        const user = UserService.insertUser(
            req.app.get('db'),
            newUser
        )
        res.status(201)
        .json(UserService.serializeUser(user))
 
        next()

})

UserRouter
    .get('/get/userprofile/:email', bodyParser, async (req,res,next) => {
        const { email } = req.params

       await UserService.getUserProfile(req.app.get('db'),email)
            .then(result => {
                if(!result){
                    console.log('no result??')
                    res.status(404).send({
                        error: 'user not found'
                    })
                }
                res.json(result)
            })

    })

    module.exports = UserRouter