const express = require('express');
const createTimeStamp = require('../../utils/createTimeStamp');
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
            //console.log("get all drinks", result)
            if(!result){
                //console.log("no result")
                res.status(404).send({error: 'no drinks found'})
            }
            //console.log('RES,drink-router',result)
            res.json(result)
        });
        next()
});

////////  BEER ENDPOINT //////////////////
DrinkRouter
    .post('/post/userBeerItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
    
        const drinkItem = DrinkService.insertBeerDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        );

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return initialPostCreated;

        res.status(201)
        .json(DrinkService.serializeBeer(drinkItem));
 
        next();
});
DrinkRouter
    .patch('/patch/beer', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchBeerDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        );
        
        res.status(204).end();
});
///////// COCKTAIL ENDPOINT ///////////////
DrinkRouter
    .post('/post/userCocktailItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
    
        const drinkItem = DrinkService.insertCocktailDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        );

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return;

        res.status(201)
        .json(DrinkService.serializeCocktail(drinkItem));
 
        next();
});
DrinkRouter
    .patch('/patch/cocktail', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchCocktailDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        );
        
        res.status(204).end();
});
///////// WINE ENDPOINT ///////////////
DrinkRouter
    .post('/post/userWineItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
    
        const drinkItem = DrinkService.insertWineDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        );

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return;

        res.status(201)
        .json(DrinkService.serializeWine(drinkItem));
 
        next();

});
DrinkRouter
    .patch('/patch/wine', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchWineDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        );
        
        res.status(204).end();
});
///////// LIQUOR ENDPOINT ///////////////
DrinkRouter
    .post('/post/userLiquorItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
        const drinkItem = DrinkService.insertLiquorDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        );

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return;

        res.status(201)
        .json(DrinkService.serializeLiquor(drinkItem));
 
        next();

});
DrinkRouter
    .patch('/patch/liquor', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchLiquorDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        );
        
        res.status(204).end();
});
///////// BINGE ENDPOINT ///////////////
DrinkRouter
    .post('/post/userBingeItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
        const drinkItem = DrinkService.insertBingeDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        );

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return;

        res.status(201)
        .json(DrinkService.serializeBinge(drinkItem));
 
        next();

});
DrinkRouter
    .patch('/patch/binge', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchBingeDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        );
        
        res.status(204).end();
});



    module.exports = DrinkRouter