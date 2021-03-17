const CumulativeDrinkService = {
    //get all drinks from all users
    async getCumulativeDrinks(db){
        let allDrinksBeerTable = await 
                db.select('total')
                    .from('beer')
        console.log("get ALL liquor sums",allDrinksBeerTable);
    },
}

module.exports = CumulativeDrinkService;