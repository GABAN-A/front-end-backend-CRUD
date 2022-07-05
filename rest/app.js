const auth = require('./routes/auth');
const register = require('./routes/register');
const cards= require('./routes/bizcards');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());


const port = 3000;
const chalk = require('chalk');
var morgan = require('morgan')
const cors = require('cors');
app.use(morgan('combined'))
const succes = chalk.bold.yellowBright;
const badreq = chalk.bold.red;
mongoose.connect('mongodb://localhost/bussinse')
  .then(() => console.log(succes('connecting to mongodb!')))
  .catch(err => console.error(badreq(error('Could not connect to mongodb', err))));
 app.listen(port, console.log(succes("server runing and lsitining on port ", `${port}`)))



app.use(cors())
app.use('/', register);
app.use('/auth', auth);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.status(404).send({
  status: 404,
  error: 'Not found'
  })
 })
 app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})










 

