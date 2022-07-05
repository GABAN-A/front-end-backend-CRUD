const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const  {User,Schema} = require('../models/users');
const _ = require("lodash");
const { Card } = require('../models/bizcard');
router.use(express.static(path.join(__dirname, 'public')))
const chalk = require('chalk');

const succes = chalk.bold.yellowBright;
const badreq = chalk.bold.red;

router.use(bodyParser.urlencoded({
    extended: true
  }));
  router.use(express.json());

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    console.log(succes("chalk success"))
})
  

  router.post('/',  async(req, res) => {
    const {error,value} = Schema.validate(req.body);
    console.log((error, value));
    if (error) {return(res.status(400).send(error.message),console.log(badreq(error)))}

    
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
    user = new User(req.body);
   const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"])).status(200)
  });
  
  router.route("/find").get(function(req, res) {
    Card.find({}, function(err, result) {
      if (err) {
        res.status(404).send(err);
        console.log(badreq(err))
      } else {
        res.json(result);
      }
    });
  });

  module.exports = router;
