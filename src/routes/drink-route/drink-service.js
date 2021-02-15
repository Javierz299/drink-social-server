const DrinkService = {
    async insertDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let beer_table = await db.select('*').from("beer").where('user_id',newDrink.user_id)
        console.log("newdrink",newDrink)
        //let initialPost = {user_id: dbUserId, newDrink[drink]: newDrink.amount}
        // if(!beer_table.length){
        //     console.log("initialPost",initialPost)
        //     return db
        //         .insert(initialPost)
        //         .into('beer')

        // }
        // if not create first post

        //patch post
    }
}

module.exports = DrinkService