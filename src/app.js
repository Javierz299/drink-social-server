const express = require('express');
const createTimeStamp = require('./utils/date');

const UserRouter = require('./routes/user-route/user-router');
const TimeRouter = require('./routes/time-route/time-router');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api',UserRouter);
app.use('/api',TimeRouter);




module.exports = app