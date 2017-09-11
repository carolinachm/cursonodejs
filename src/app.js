'use strict'// ele força o js ser mais criterioso
const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const app = express();
const router = express.Router();
//carrega as rotas


const db = require('./models/index');
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.db = db;

app.use('/', indexRoute);
app.use('/product', productRoute);


module.exports = app;