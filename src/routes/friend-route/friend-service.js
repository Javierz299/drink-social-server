const FriendService = {
    async findFriend(db,friend){
        console.log('service',friend)
        let friend_name = await db.select('id','username').from('user').where('username','like',`%${friend}%`)
        console.log('friend_name',friend_name)
        if(friend_name.length === 0){
            return {}
        }

        return friend_name;
    },

    async insertFriendRequest(db,request){
        let requestCheck = await db.select('sent_request_to')
                .from('friend')
                .where('sent_request_to',request.friend)
        console.log('requestCheck',requestCheck)
    },
}

module.exports = FriendService;