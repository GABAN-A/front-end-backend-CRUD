const express = require('express');
const _ = require('lodash');
const {Card, validateCard, generateBizNumber, validatecardid, validateCards} = require('../models/bizcard');
const auth = require('../midlleware/auth');
const { User} = require('../models/users');
const router = express.Router();


router.post('/', auth, async (req, res) => {
  const {  error} = validateCard(req.body);
  console.log(req.body)
  if (error) return (res.status(400).json((error.details[0].message)));
  else {
    try {
      let card = new Card({
        bizName: req.body.bizName,
        UserIDnumber: req.body.UserIDnumber,
        user_id: req.body.user_id,
        bizPhone: req.body.bizPhone,
        bizAddress: req.body.bizAddress,
        bizDescription: req.body.bizDescription,
        bizNumber: await generateBizNumber(Card),
        bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      });
      post = await card.save();
      res.send(post)
    } catch (error) {
      console.log(error)
      res.status(500).json("id number should be unique|| " + error);
    }
  }
});
router.route("/find").get(function (req, res) {
  Card.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      const arrOfObj3 = Object.entries(result).map(entry => entry[1])
      res.send(arrOfObj3)
      //res.send(arrOfObj3[0].bizName,"<br></br>",arrOfObj3[0].bizName);//
    }

  });
});
router.post('/hello', (req, res) => {
  let card;console.log(req.body)
  var id = req.body._id;
  Card.findById(id, function (err, docs) {
    card = docs;
    if (err) {
      return res.status(404).send('The card with the given ID was not found.');
    } else if(card==null){
      res.send("The card with the given ID was not found")
    }else{
      console.log("Result : ", docs);
      res.send(card)
    }
  });
});

router.get('/getcard', auth, async (req, res) => {
  let byid = req.user._id
  let user = await User.findById(byid);
  if (user.bussnisaccount === false) {
    res.send(user.bussnisaccount)
    return
  } else {
    Card.find({
      user_id: byid
    }, function (err, docs) {
      console.log(docs);
      if (err) {
        console.log(err);
        res.sendStatus(500, err)
      } else {
        res.send(docs)
      }
    })
  }
});

router.put('/updatecard', auth, async (req, res) => {
  let id = req.header('cardid');
  if (id.length!=24){
    return res.json("card id must be 24 digits")
  }
  try {
    const { error} = validateCard(req.body);
    console.log(req.body)
  if (error) return (res.status(400).json((error.details[0].message)));
  console.log("theese is", error)
  let cheakcard = await Card.findOne({
    _id: id
  });
  if (!cheakcard) return (res.status(400).json("card not found"))
  console.log(req.body)
  let card = await Card.findOneAndUpdate({
    _id: id
  }, req.body);
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  card = await Card.findOne({
    _id: id
  });
  res.send(card);
}catch (error) {
  console.log(error)
  res.status(500).json("internal server error " + error);
}
});

router.delete('/DELETE', auth, async (req, res) => {
  let id = req.header('CARDID'),
    userid = req.header('USERID');
  let cardcheak = {cardid: id,user_id: userid}
  console.log(cardcheak)
  let {  error} = (validatecardid(cardcheak));
  if (error) {return (res.status(404).json(error.details[0].message))}
   else {
    const card = await Card.findOneAndRemove({
      _id: id,
      user_id: userid
    });
    if (!card) return res.status(404).json('The card with the given ID was not found.');
    res.json(200, ("card was deleted"+card));
  }
});


router.patch('/patch', auth, async (req, res) => {
  try {
    let id = req.header('CARDID');
    let userlikes = req.header('USERID');
    console.log(req.headers)
    if(id==""){
      return (res.status(400).json("empty and less than 3 digits"))
    }
    let cheakcard = await Card.findOne({bizNumber: id});
    if (!cheakcard) return (res.status(400).json("card not found "))
    console.log(cheakcard)
    if (cheakcard.likes.indexOf(userlikes) !== -1) {
      res.json("CARD IS ALREADY ADDED TO LIKES")
    } else {
      cheakcard.likes.push(userlikes);
      cheakcard = await cheakcard.save();
      res.status(200).send(cheakcard)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(`server connection problem ${error} `);
  }
});
module.exports = router;