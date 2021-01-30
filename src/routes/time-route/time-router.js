const express = require('express');
const TimeService = require('./time-service');
const createTimeStamp = require('../../utils/date')

const TimeRouter =  express.Router();

TimeRouter
    .get('/get/timestamp/', async (req,res,next) => {

       await TimeService.getTimeStamp(req.app.get('db'))
            .then(result => {
                createTimeStamp(result[0].created)
                // if(!result){
                //     console.log('no result??')
                //     res.status(404).send({
                //         error: 'user not found'
                //     })
                // }
                res.json(result[0].created)
            })
            next()
    })

    module.exports = TimeRouter