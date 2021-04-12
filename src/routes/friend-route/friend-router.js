const express = require('express');

const FriendService = require('./friend-service');
const FriendRouter = express.Router();

FriendRouter
    .post('/post/friend/request', (req,res,next) => {
        const { user, friend } = req.body;
        const newRequest = {
            user,
            sent_request_to: friend
        }

        const userRequest = FriendService.insertFriendRequest(
            req.app.get('db'),
            newRequest
        )
        console.log('userRequest',userRequest)
    });

FriendRouter
    .get('/get/friend/:friend', async (req,res,next) => {
        //name of friend
        const { friend } = req.params
        console.log('friend-req params',req.params)

        await FriendService.findFriend(req.app.get('db'),friend)
            .then(result => {
                if(!result){
                    console.log('no result/no user')
                    res.status(404).send({
                        error: 'user not found'
                    })
                }
                console.log('friend result', result)
                res.json(result)
            })
            
    });

module.exports = FriendRouter;