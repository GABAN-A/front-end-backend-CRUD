const Joi = require('joi');
const bcrypt=require('bcrypt');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require("lodash")
app.use(express.json());
const auth = require('./routes/auth');
const  {User,Schema} = require('../rest/models/users');


app.use('/auth', auth);
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}));
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



app.get('/', function (req, res) {
  res.sendFile('/index.html');
})

app.post('/',  async(req, res) => {
  const {error,value} = Schema.validate(req.body);
  console.log(badreq(error, value));
  data = req.body;
  if (error) {
    res.status(400).send(error.message)
  }
  console.log(req.body);
 
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  
  user = new User(req.body);
 
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
 
  await user.save();
 
  res.send(_.pick(user, ["_id", "name", "email"])).status(200)
});




 

