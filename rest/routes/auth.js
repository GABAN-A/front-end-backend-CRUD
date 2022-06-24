const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const {User }  = require('../models/users');
const auth = require('../midlleware/auth');
const _ = require("lodash");
const {nextTick } = require('process');

let authotoken;let user={};let golabluser="";
router.use(express.static(path.join(__dirname, 'public')))
router.use(bodyParser.urlencoded({
  extended: true
}));


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
})

router.post('/', async (req, res,next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 
   user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
 
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
 const token= user.generateAuthToken();
authotoken=token;
golabluser=user;
  res.redirect('/auth/userpage');

});
router.get('/userpage',async function (req, res,) {
  if(golabluser=""){
    res.send("no entry")
  }
else{
  res.header("authotoken",authotoken);
  res.header(_.pick(user, ['_id', 'name', 'email'])).sendFile(path.join(__dirname, '../public', 'userpage.html'));
console.log("these is hsssere",(authotoken))
}
})
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  });
  return schema.validate(req);
}
router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  console.log(user);
  res.send(JSON.stringify(user));
});
 
module.exports = router;
