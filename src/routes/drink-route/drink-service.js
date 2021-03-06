
const DrinkService = {
////////////// GET ALL DRINKS /////////////////
async getAllDrinks(db,id){
    let userBeerTable = await db.select('*').from('beer').where('user_id',id);
    let userCocktailTable = await db.select('*').from('cocktail').where('user_id',id);
    let userWineTable = await db.select('*').from('wine').where('user_id',id);
    let userLiquorTable = await db.select('*').from('liquor').where('user_id',id);
    let userBingeTable = await db.select('*').from('binge').where('user_id',id);

    //do not send "user_id" not needed
    //probably will have to select each specific one from each table.
    if(userBeerTable.length){
        delete userBeerTable[0].user_id
        delete userCocktailTable[0].user_id
        delete userWineTable[0].user_id
        delete userLiquorTable[0].user_id
        delete userBingeTable[0].user_id 
    } else {
        return {};
    };
    
    const allDrinkTables = {
        beerTable: userBeerTable[0],
        cocktailTable: userCocktailTable[0],
        wineTable: userWineTable[0],
        liquorTable: userLiquorTable[0],
        bingeTable: userBingeTable[0]
    }
    return allDrinkTables;
},

////////////////// BEER CAROUSEL /////////////////////
    async insertBeerDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let beer_table = await db.select('*').from("beer").where('user_id',newDrink.user_id);

        //beer table should have found current users initial post
        //there for return already created
        if(beer_table.length){
            //console.log("beer already created")
            return; //{initialPost: "already created"}
        }

        if(!beer_table.length){
             //console.log("initialPost")
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
        }
    },
    async patchBeerDrink(db,userDrink){
        return await db
        .select(userDrink.userDrinkItem)
        .from('beer')
        .where('user_id',userDrink.dbUserId)
        .increment('total',1)
        .increment(userDrink.userDrinkItem, 1)
    },

////////////////// COCKTAIL CAROUSEL /////////////////////
    async insertCocktailDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let cocktail_table = await db.select('*').from("cocktail").where('user_id',newDrink.user_id);

        //beer table should have found current users initial post
        //there for return already created
        if(cocktail_table.length){
            return; //{initialPost: "already created"}
        }

        if(!cocktail_table.length){
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
        }
    },
    async patchCocktailDrink(db,userDrink){
        return await db
        .select(userDrink.userDrinkItem)
        .from('cocktail')
        .where('user_id',userDrink.dbUserId)
        .increment('total',1)
        .increment(userDrink.userDrinkItem, 1)
    },

////////////////// WINE CAROUSEL /////////////////////
    async insertWineDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let wine_table = await db.select('*').from("wine").where('user_id',newDrink.user_id);

        //beer table should have found current users initial post
        //there for return already created
        if(wine_table.length){
            return; //{initialPost: "already created"}
        }

        if(!wine_table.length){
             return db
                .insert(newDrink)
                .into('wine')
                .returning('*')
                .then(([wine]) => wine)
         }
    },
    serializeWine(drink){
        return {
            user_id: drink.user_id,
            red_wine: drink.red_wine,
            white_wine: drink.white_wine,
            sangria: drink.sangria,
            champagne: drink.champagne,
        }
    },
    async patchWineDrink(db,userDrink){
        return await db
        .select(userDrink.userDrinkItem)
        .from('wine')
        .where('user_id',userDrink.dbUserId)
        .increment('total',1)
        .increment(userDrink.userDrinkItem, 1)
    },

////////////////// LIQUOR CAROUSEL /////////////////////
    async insertLiquorDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let liquor_table = await db.select('*').from("liquor").where('user_id',newDrink.user_id);

        //beer table should have found current users initial post
        //there for return already created
        if(liquor_table.length){
            return; //{initialPost: "already created"}
        }

        if(!liquor_table.length){
             return db
                .insert(newDrink)
                .into('liquor')
                .returning('*')
                .then(([liquor]) => liquor)
         }
    },
    serializeLiquor(drink){
        return {
            user_id: drink.user_id,
            tequila_shot: drink.tequila_shot,
            vodka_shot: drink.vodka_shot,
            whiskey_shot: drink.whiskey_shot,
            bourbon: drink.bourbon,
            scotch: drink.scotch,
            brandy: drink.brandy,
        }
    },
    async patchLiquorDrink(db,userDrink){
        return await db
        .select(userDrink.userDrinkItem)
        .from('liquor')
        .where('user_id',userDrink.dbUserId)
        .increment('total',1)
        .increment(userDrink.userDrinkItem, 1)
    },

////////////////// BINGE CAROUSEL /////////////////////
    async insertBingeDrink(db,newDrink){
        //check db table "beer" if there is an intial post
        let binge_table = await db.select('*').from("binge").where('user_id',newDrink.user_id);

        //beer table should have found current users initial post
        //there for return already created
        if(binge_table.length){
            return; //{initialPost: "already created"}
        }

        if(!binge_table.length){
             return db
                .insert(newDrink)
                .into('binge')
                .returning('*')
                .then(([binge]) => binge)
         }
    },
    serializeBinge(drink){
        return {
            user_id: drink.user_id,
            beer_bong: drink.beer_bong,
            shotgun: drink.shotgun,
            boilermaker: drink.boilermaker,
        }
    },
    async patchBingeDrink(db,userDrink){
        return await db
        .select(userDrink.userDrinkItem)
        .from('binge')
        .where('user_id',userDrink.dbUserId)
        .increment('total',1)
        .increment(userDrink.userDrinkItem, 1)
    },
}

module.exports = DrinkService;