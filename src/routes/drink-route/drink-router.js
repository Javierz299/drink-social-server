const express = require('express');
const { init } = require('../../app');
const createTimeStamp = require('../../utils/createTimeStamp');
const DrinkService = require('./drink-service');

const DrinkRouter = express.Router();

//This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads
//const bodyParser = express.json();

DrinkRouter
    .post('/post/userDrinkItem', (req,res,next) => { 
        // add new drink to db
        const newDrink = req.body
        const newDrinkwTimeStamp = {...newDrink, submitted: createTimeStamp()}
    
        const drinkItem = DrinkService.insertDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        )

        let initialPostCreated = drinkItem.then(res => res.initialPost)
        //we need to return something else, otherwise we get a 500 server error
        //on the client side due to trying to post again.
        //if "already created" just return nothing.
        if(initialPostCreated) return;

        res.status(201)
        .json(DrinkService.serializeUser(drinkItem))
 
        next()

});

DrinkRouter
    .patch('/patch/beer', (req,res,next) => {
        const updateDrink = req.body;
        DrinkService.patchUserDrink(
            req.app.get('db'),
            {...updateDrink, submitted: createTimeStamp()}
        )
        
        res.status(204).end()
        
});



    module.exports = DrinkRouter