
const UserService = {
    async insertUser(db,newUser){
        //check db if email exits
        let value = await db.select('id','email').from('user').where('email',newUser.email)
        let emailValue = "";
        console.log('VALUE',value)
        //if value contains user in arr then get email if not log()
        if(value.length){
            emailValue = await value[0].email;
        }
        // if email , then check if incoming email 
        //is the same as db email
        if(emailValue)
            if(newUser.email === emailValue){
                console.log('user with that email exists',value[0])
                return value[0]
            }
        console.log("add new user")
        return db
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(([user]) => user)    
    },
    serializeUser(user){
        return {
            username: user.name,
            email: user.email
        }
    },

    async getUserId(db,email){
        let userId = await db.select('*').from('user').where('email',email).first();
        return userId
    },

}

module.exports = UserService