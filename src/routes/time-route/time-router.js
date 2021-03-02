const express = require('express');
const TimeService = require('./time-service');
const createTimeStamp = require('../../utils/createTimeStamp')

const TimeRouter =  express.Router();

TimeRouter
    .get('/get/timestamp/', async (req,res,next) => {

       await TimeService.getTimeStamp(req.app.get('db'))
            .then(result => {
                createTimeStamp(result[0].created)
                if(!result){
                    res.status(404).send({
                        error: 'no date result'
                    })
                }
                res.json(result[0].created)
            })
            .catch((e) => console.log("getTime",e))
            next()
    })

    module.exports = TimeRouter