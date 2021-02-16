const DrinkService = {
////////////////// BEER CAROUSEL /////////////////////
    async insertBeerDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let beer_table = await db.select('*').from("beer").where('user_id',newDrink.user_id);
        console.log("newdrink",newDrink)
        console.log('beer_table',beer_table[0])

        //beer table should have found current users initial post
        //there for return already created
        if(beer_table.length > 0){
            return {initialPost: "already created"}
        }

        if(!beer_table.length){
             console.log("initialPost")
             return db
                .insert(newDrink)
                .into('beer')
                .returning('*')
                .then(([beer]) => beer)
         }
    },
    serializeBeer(drink){
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
    async patchBeerDrink(db,userDrink){
        console.log("patch",userDrink)
        return await db
        .select(userDrink.userDrinkItem)
        .from('beer')
        .where('user_id',userDrink.dbUserId)
        .update({'submitted': userDrink.submitted})
        .increment(userDrink.userDrinkItem, 1)
    },

////////////////// COCKTAIL CAROUSEL /////////////////////
    async insertCocktailDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let cocktail_table = await db.select('*').from("cocktail").where('user_id',newDrink.user_id);
        console.log("newdrink",newDrink)
        //console.log('cocktail_table',cocktial_table[0])

        //beer table should have found current users initial post
        //there for return already created
        if(cocktail_table.length > 0){
            return {initialPost: "already created"}
        }

        if(!cocktail_table.length){
             console.log("initialPost")
             return db
                .insert(newDrink)
                .into('cocktail')
                .returning('*')
                .then(([cocktail]) => cocktail)
         }
    },
    serializeCocktail(drink){
        return {
            user_id: drink.user_id,
            margarita: drink.margarita,
            bloody_mary: drink.bloody_mary,
            mimosa: drink.mimosa,
            martini: drink.martini,
            mojito: drink.mojito,
            gin_and_tonic: drink.gin_and_tonic,
            moscow_mule: drink.moscow_mule,
            paloma: drink.paloma,
            daiquiri: drink.daiquiri,
            long_island: drink.long_island,
            misc: drink.misc,
            submitted: drink.submitted
        }
    },
    async patchCocktailDrink(db,userDrink){
        console.log("patch",userDrink)
        return await db
        .select(userDrink.userDrinkItem)
        .from('cocktail')
        .where('user_id',userDrink.dbUserId)
        .update({'submitted': userDrink.submitted})
        .increment(userDrink.userDrinkItem, 1)
    },
}

module.exports = DrinkService