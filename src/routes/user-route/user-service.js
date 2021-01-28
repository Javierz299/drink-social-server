
const UserService = {
    async insertUser(db,newUser){
        //check db if email exits
        let value = await db.select('email').from('user').where('email',newUser.email)
        let emailValue;
        console.log('VALUE',value)
        //if value contains ele in arr then grab email if not log()
        if(value.length){
            emailValue = await value[0].email;
        }
        if(emailValue !== null || emailValue !== undefined)
            if(newUser.email === emailValue){
                return console.log('USER WITH THAT EMAIL EXISTS')
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

    getUserProfile(db,email){
        return db 
            .select('*')
            .from('user')
            .where('email',email)
            .first()
    },

}

module.exports = UserService