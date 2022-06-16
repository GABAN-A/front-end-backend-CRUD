const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const {User }  = require('../models/users');
const auth = require('../midlleware/auth');

let authotoken;
router.use(express.static(path.join(__dirname, 'public')))
router.use(bodyParser.urlencoded({
  extended: true
}));




 

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'aref.html'));
})


router.post('/', async (req, res) => {
  

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
 
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
 const token= user.generateAuthToken();
authotoken=token;
 
  res.redirect('/auth/me')
  router.get('/me',function (req, res) {
    console.log(authotoken)
    res.header({
    authotoken
  });
    res.sendFile(path.join(__dirname, '../public', 'me.html'));
  })
  
});

function validate(req) {

  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  });
 
  return schema.validate(req);
}


 



router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(JSON.stringify(user));
});
 



module.exports = router;
