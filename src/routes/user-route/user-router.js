const express = require('express');
const createTimeStamp = require('../../utils/createTimeStamp');
const UserService = require('./user-service');

const UserRouter = express.Router();

//This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads
//const bodyParser = express.json();

UserRouter
    .post('/post/userprofile', (req,res,next) => { 
        // add new user to db
        const { name, email } = req.body
        const newUser = {
            username: name,
            email,
            created: createTimeStamp()
        }

        const user = UserService.insertUser(
            req.app.get('db'),
            newUser
        )
        res.status(201).json(UserService.serializeUser(user));

        next();

})

UserRouter
    .get('/get/userid/:email', async (req,res,next) => {
        const { email } = req.params;
       await UserService.getUserId(req.app.get('db'),email)
            .then(result => {
                if(!result){
                    res.status(404).send({
                        error: 'user not found'
                    })
                }
                res.json(result)
            })
            .catch((e) => console.log("get userid route",e))
        next()
});

    module.exports = UserRouter