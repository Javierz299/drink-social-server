const express = require('express');
const DrinkService = require('./drink-service');

const DrinkRouter = express.Router();

//This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads
//const bodyParser = express.json();

////// GET ALL DRINKS /////////////////
DrinkRouter
    .get('/get/allDrinks/:id', async (req,res,next) => {
        const { id } = req.params;

        await DrinkService.getAllDrinks(
            req.app.get('db'),
            id
        )
        .then(result => {
            if(!result){
                res.status(404).send({error: 'no drinks found'})
            }
            res.json(result)
        })
        .catch((e) => console.log("get allDrinks Route",e))

        next();
});

////////  BEER ENDPOINT //////////////////
DrinkRouter
    .post('/post/userBeerItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
    
        const drinkItem = DrinkService.insertBeerDrink(
            req.app.get('db'),
            newDrink
        );

        res.status(201)
        .json(DrinkService.serializeBeer(drinkItem))
        .catch((e) => console.log("post Beer Route",e))
 
        next();
});
DrinkRouter
    .patch('/patch/beer', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchBeerDrink(
            req.app.get('db'),
            {...updateDrink}
        );
        
        res.status(204).end()
        //.catch((e) => console.log("patch Beer Route",e))
});
///////// COCKTAIL ENDPOINT ///////////////
DrinkRouter
    .post('/post/userCocktailItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        
        const drinkItem = DrinkService.insertCocktailDrink(
            req.app.get('db'),
            newDrink
        );

        res.status(201)
        .json(DrinkService.serializeCocktail(drinkItem))
        .catch((e) => console.log("post Cocktail Route",e))

 
        next();
});
DrinkRouter
    .patch('/patch/cocktail', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchCocktailDrink(
            req.app.get('db'),
            {...updateDrink}
        );
        
        res.status(204).end()
});
///////// WINE ENDPOINT ///////////////
DrinkRouter
    .post('/post/userWineItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
    
        const drinkItem = DrinkService.insertWineDrink(
            req.app.get('db'),
            newDrink
        );

        res.status(201)
        .json(DrinkService.serializeWine(drinkItem))
        .catch((e) => console.log("post Wine Route",e))

        next();

});
DrinkRouter
    .patch('/patch/wine', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchWineDrink(
            req.app.get('db'),
            {...updateDrink}
        );
        
        res.status(204).end()
});
///////// LIQUOR ENDPOINT ///////////////
DrinkRouter
    .post('/post/userLiquorItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const drinkItem = DrinkService.insertLiquorDrink(
            req.app.get('db'),
            newDrink
        );

        res.status(201)
        .json(DrinkService.serializeLiquor(drinkItem))
        .catch((e) => console.log("post Liquor Route",e))

 
        next();

});
DrinkRouter
    .patch('/patch/liquor', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchLiquorDrink(
            req.app.get('db'),
            {...updateDrink}
        );
        
        res.status(204).end()
});
///////// BINGE ENDPOINT ///////////////
DrinkRouter
    .post('/post/userBingeItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const drinkItem = DrinkService.insertBingeDrink(
            req.app.get('db'),
            newDrink
        );

        res.status(201)
        .json(DrinkService.serializeBinge(drinkItem))
        .catch((e) => console.log("post Binge Route",e))

 
        next();

});
DrinkRouter
    .patch('/patch/binge', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchBingeDrink(
            req.app.get('db'),
            {...updateDrink}
        );
        
        res.status(204).end()
});



    module.exports = DrinkRouter;