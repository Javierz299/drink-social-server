const express = require('express');

const FriendService = require('./friend-service');
const FriendRouter = express.Router();

FriendRouter
    .post('/post/friend/request', (req,res,next) => {
        const { id, username, addUser } = req.body;
        console.log('req body',req.body);
        const newRequest = {
            user: username,
            sent_request_to: addUser.username,
            accepted: false
        }

        const userRequest = FriendService.insertFriendRequest(
            req.app.get('db'),
            newRequest
        )
        console.log('userRequest',userRequest)
        res.status(201).json(FriendService.serializeRequset(userRequest));

        next()
});

FriendRouter
    .get('/get/friend/:friend', async (req,res,next) => {
        //name of friend
        const { friend } = req.params
        console.log('friend-req params',req.params)

        await FriendService.findFriend(req.app.get('db'),friend)
            .then(result => {
                if(!result){
                    res.status(404).send({
                        error: 'something went wrong while searching friends'
                    })
                }
                console.log('friend result', result)
                res.json(result)
            })
            
});

module.exports = FriendRouter;