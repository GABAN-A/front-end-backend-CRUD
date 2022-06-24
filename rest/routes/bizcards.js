const express = require('express');
const _ = require('lodash');
const { Card, validateCard, generateBizNumber } = require('../models/bizcard');
const auth = require('../midlleware/auth');
const { json } = require('express/lib/response');
const { User } = require('../models/users');
const router = express.Router();

router.post('/',  async (req, res) => {

  const { error } = validateCard(req.body);
  console.log(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card(
    {
      bizName: req.body.bizName,
      user_id: req.body.user_id,
      bizPhone: req.body.bizPhone,
      bizAddress: req.body.bizAddress,
      bizDescription: req.body.bizDescription,
      bizNumber: await generateBizNumber(Card), 
    }
  );
  post = await card.save();
  res.send(post)
});
router.route("/find").get(function(req, res) {
  Card.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      const arrOfObj3 = Object.entries(result).map(entry => entry[1])
  res.send(arrOfObj3)
      //res.send(arrOfObj3[0].bizName,"<br></br>",arrOfObj3[0].bizName);//
    }
  
  });
});
router.post('/hello',  (req, res) => {
 let card;
  var id = req.body._id;
Card.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      card=docs;
        console.log("Result : ", docs);
        res.send(card)
    }
});
});
router.get('/getcard',auth, (req, res) => {
   let byid=req.user._id
  Card.find({user_id:byid}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
        res.send(docs)     
       }
  })
});

module.exports = router;