const FriendService = {
    async findFriend(db,friend){
        console.log('service',friend)
        let friend_name = await db.select('id','username')
                .from('user')
                .where('username','like',`%${friend}%`)

        console.log('friend_name',friend_name)
        if(friend_name.length === 0){
            return [{id: "default",username: "no results found"}];
        }

        return friend_name;
    },

    async insertFriendRequest(db,request){
        let requestCheck = await db.select('user','sent_request_to')
                .from('friend')
                .where('user',request.user)
                .andWhere('sent_request_to',request.sent_request_to)
        console.log('requestCheck',requestCheck)

        if(requestCheck.length){
            console.log("request already made")
            return "request already made"
        } else {
            console.log("add friend")
            return db
            .insert(request)
            .into('friend')
            .returning('*')
            .then(([request]) => request)
        }


    },
    serializeRequset(req){
        return {
            user: req.user,
            sent_request_to: req.sent_request_to,
        }
    },
    async getPending(db,user){
        console.log("service pending",user)
        const pendingRequests = await db.select('*')
                .from('friend')
                .where('sent_request_to',user)
                .andWhere('accepted',false)

        if(!pendingRequests.length) return {};

        return pendingRequests;
    },

    addFriend(db,user){

        return db.select('accepted')
            .from('friend')
            .where('user',user.user)
            .andWhere('sent_request_to',user.sent_request_to)
            .update('accepted',true)
    },

    async getFriends(db,user){
        let list = await db.select('id','username')
            .from('user')
            .join('friend', { 'user.username': 'friend.user'})
            .where('sent_request_to',user)
            .andWhere('accepted',true)
            //.limit(1)
        console.log("list",list);
        return list;
    },

    deleteFriend(db,user){
        return db.select('*')
            .from('friend')
            .where('user',user.user)
            .andWhere('sent_request_to',user.sent_request_to)
            .delete()
    },
}

module.exports = FriendService;