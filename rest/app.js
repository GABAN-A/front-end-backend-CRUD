const auth = require('./routes/auth');
const login = require('./routes/login');
const cards= require('./routes/bizcards');

const Joi = require('joi');
const bcrypt=require('bcrypt');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require("lodash")
app.use(bodyParser.json());


const port = 3000;
const chalk = require('chalk');
var morgan = require('morgan')
const cors = require('cors');
app.use(morgan('combined'))
const succes = chalk.bold.yellowBright;
const badreq = chalk.bold.red;
mongoose.connect('mongodb://localhost/eshop')
  .then(() => console.log(succes('connecting to mongodb!')))
  .catch(err => console.error(error('Could not connect to mongodb', err)));
 app.listen(port, console.log(succes("server runing and lsitining on port ", `${port}`)))


 app.use(cors({
  origin: 'https://localhost/3000'
}));

app.use('/', login);
app.use('/auth', auth);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}));











 

