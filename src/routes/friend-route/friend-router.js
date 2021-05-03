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
        const { friend } = req.params;
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

FriendRouter
    .get('/get/pending/:user', (req,res,next) => {
        const { user } = req.params;
        console.log("get pending params",req.params,user)

         FriendService.getPending(req.app.get('db'),user)
            .then(result => {
                if(!result){
                    res.status(404).send({
                    error: 'something went wrong while searching pending'
                    })
                }
            
                res.json(result)
            })

});

FriendRouter
    .patch('/add/friend', (req,res,next) => {
        const { user, sent_request_to} = req.body
        const acceptRequest = {
            user,
            sent_request_to,
        }
        console.log('add friend',user,sent_request_to)

        FriendService.addFriend(req.app.get('db'),acceptRequest)
        .then(result => {
            if(!result){
                res.status(404).send({
                error: 'something went wrong while accepting request'
                })
            }
        
            res.json(result)
        })

    })

FriendRouter
    .delete('/delete/friend', (req,res,next) => {
        const { user, sent_request_to } = req.body;
        const deleteRequest = {
            user,sent_request_to,
        }
        console.log("deleteRequest", deleteRequest)
        FriendService.deleteFriend(req.app.get('db'),deleteRequest)
            .then(result => {
                if(!result){
                    res.status(404).send({
                    error: 'something went wrong while deleting request'
                    })
                }
            
                res.json(result)
            })
    })

module.exports = FriendRouter;