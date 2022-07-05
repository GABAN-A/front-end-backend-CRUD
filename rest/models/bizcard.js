const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const cardSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  UserIDnumber: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  bizAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400
  },
  bizImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10
  },
  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true
  },
  likes:[],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },

});

const Card = mongoose.model('Card', cardSchema);

function validatecardid(cardcheak )
{
  const schema = Joi.object({
    cardid: Joi.string().min(24).max(24).required(),
    user_id: Joi.string().min(24).max(24).required(),
})
return schema.validate(cardcheak);
}
function validateCard(card) {

  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    UserIDnumber:Joi.string().min(9).max(9).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    user_id: Joi.string(),
    bizImage: Joi.string().min(11).max(1024)
  });

  return schema.validate(card);
}
 
function validateCards(data) {
 
  const schema = Joi.object({
    likes: Joi.array().min(1)
  });
 
  return schema.validate(data);
}
async function generateBizNumber(Card) {

  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({
      bizNumber: randomNumber
    });
    if (!card) return String(randomNumber);
  }

}

exports.Card = Card;
exports.validateCard = validateCard;
exports.validatecardid=validatecardid;
exports.generateBizNumber = generateBizNumber;
exports.validateCards = validateCards;