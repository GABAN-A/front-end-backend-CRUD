const express = require('express');
const _ = require('lodash');
const { Card, validateCard, generateBizNumber } = require('../models/bizcard');
const auth = require('../midlleware/auth');
const { json } = require('express/lib/response');
const { User } = require('../models/users');
const router = express.Router();

router.post('/',auth, async (req, res) => {
  const { error } = validateCard(req.body);
  console.log(req.body)
  if (error) return (res.status(400).json((error.details[0].message)));
  else{
  let card = new Card(
    {
      bizName: req.body.bizName,
      user_id: req.body.user_id,
      bizPhone: req.body.bizPhone,
      bizAddress: req.body.bizAddress,
      bizDescription: req.body.bizDescription,
      bizNumber: await generateBizNumber(Card), 
      bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    }
  );
  post = await card.save();
  res.send(post)
  }
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

router.get('/getcard',auth, async(req, res) => {
   let byid=req.user._id
   let user = await User.findById(byid);
if(user.bussnisaccount===false){
  res.send(user.bussnisaccount)     
  return
}
else{
  Card.find({user_id:byid}, function (err, docs) {
    console.log(docs);
      if (err){
          console.log(err);
          res.sendStatus(500,err)
      }
      else{
        res.send(docs)     
       }
  })
}
});


module.exports = router;