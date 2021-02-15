const express = require('express');
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
    
        //instead of posting amount value post 1 per submitt 
        //and then times total with amount values when getting all drinks
        console.log('newDrink',newDrinkwTimeStamp);

        const drinkItem = DrinkService.insertDrink(
            req.app.get('db'),
            newDrinkwTimeStamp
        )
        console.log("DRINK ITEM", drinkItem)
        // res.status(201)
        // .json(UserService.serializeUser(user))
 
        next()

})



    module.exports = DrinkRouter