const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const userschema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      dropDups: true, 
    },
    email: {
      type: String,
      index: true,
     
    },
    password: {
      type: String,
      required: true
    },
    bussnisaccount: {type:Boolean,required:true},
    created_at    : { type: Date, required: true, default: Date.now },
    cards: Array,
  });
  userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, biz: this.biz }, config.get('jwtKey'));
    return token;
  }
  const User = mongoose.model('User', userschema);
 
  const Schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string().min(4).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net']
        },

      }),
    normalUser: Joi.any(),
    bussnisaccount: Joi.any(),
    
  })
  function validateCards(data) {
 
    const schema = Joi.object({
      cards: Joi.array().min(1).required()
    });
   
    return schema.validate(data);
  }
  exports.User = User;
exports.validateCards = validateCards;
exports.Schema=Schema;