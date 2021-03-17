const express = require('express');

const UserRouter = require('./routes/user-route/user-router');
const TimeRouter = require('./routes/time-route/time-router');
const DrinkRouter = require('./routes/drink-route/drink-router');
const CumulativeDrinkRouter = require('./routes/cumulative-drinks/cumulative-drink-route');

require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = express.json();

const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(bodyParser);
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api',UserRouter);
app.use('/api',TimeRouter);
app.use('/api',DrinkRouter);
app.use('/api',CumulativeDrinkRouter);




module.exports = app