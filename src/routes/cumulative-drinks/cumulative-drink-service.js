//best thing to do is to create a different table that keeps track of each
//drink carousel that was submitted by user. that way we can just pull from that table
//from each category/drink carousel and not have to do any iteration of ALL users

const CumulativeDrinkService = {
    //get all drinks from all users
    async getCumulativeDrinks(db){
        //can do await promise.all([])
        //let [result1,result2...] = await promis.all
        //promise.allSettled will tell us the status of each
        let [allBeer, allCocktail, allWine, allLiquor, allBinge] = await 
            Promise.all([
                db.select('total').from('beer'),
                db.select('total').from('cocktail'),
                db.select('total').from('wine'),
                db.select('total').from('liquor'),
                db.select('total').from('binge'),
            ])
        let [beer, cocktail, wine, liquor, binge] = await Promise.all([
            allBeer.reduce((acc,curr) => acc + curr.total,0),
            allCocktail.reduce((acc,curr) => acc + curr.total,0),
            allWine.reduce((acc,curr) => acc + curr.total,0),
            allLiquor.reduce((acc,curr) => acc + curr.total,0),
            allBinge.reduce((acc,curr) => acc + curr.total,0)
        ])
        
        console.log("get ALL beer",beer,cocktail,wine,liquor,binge);
        return {
            'beerTotal': beer, 'cocktailTotal': cocktail,
            'wineTotal': wine, 'liquorTotal': liquor,
            'bingeTotal': binge
        }
    },
}

module.exports = CumulativeDrinkService;