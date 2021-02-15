const DrinkService = {
    async insertDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let beer_table = await db.select('*').from("beer").where('user_id',newDrink.user_id)
        console.log("newdrink",newDrink)
        if(!beer_table.length){
             console.log("initialPost")
             return db
                .insert(newDrink)
                .into('beer')
                .returning('*')
                .then(([beer]) => beer)
         }
        // if not create first post

        //patch post
    },
    serializeDrink(drink){
        return {
            user_id: drink.user_id,
            beer: drink.beer,
            pint_beer: drink.pint_beer,
            tall_beer: drink.tall_beer,
            forty: drink.forty,
            craft: drink.craft,
            craft_pint: drink.craft_pint,
            craft_tall: drink.craft_tall,
            seltzer: drink.seltzer,
            tall_seltzer: drink.tall_seltzer,
            smirnoff_ice: drink.smirnoff_ice,
            six_percent: drink.six_percent,
            seven_percent: drink.seven_percent,
            eight_percent: drink.eight_percent,
            nine_percent: drink.nine_percent,
            ten_percent: drink.ten_percent,
            submitted: drink.submitted
        }
    },
    async patchUserDrink(db,userDrink){
        console.log("patch",userDrink)
        return await db
        .select(userDrink.userDrinkItem)
        .from('beer')
        .where('user_id',userDrink.dbUserId)
        .update({'submitted': userDrink.submitted})
        .increment(userDrink.userDrinkItem, 1)
    },
}

module.exports = DrinkService