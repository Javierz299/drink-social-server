const express = require('express');
const CumulativeDrinkService = require('./cumulative-drink-service');

const CumulativeDrinkRouter = express.Router();

CumulativeDrinkRouter
    .get('/get/cumulativeDrinks', async (req,res, next) => {

        await CumulativeDrinkService.getCumulativeDrinks(
            req.app.get('db'),
        )
        .then(result => {
            if(!result){
                res.status(404).send({error: "error getting cumulative drinks"})
            }
            res.json(result)
        })
        .catch((e) => console.log("cumulative drinks route",e))

        next();
});

module.exports = CumulativeDrinkRouter;