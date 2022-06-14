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
    Date:{type:Date},
  });
  
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
        }
      }),
    normalUser: Joi.any(),
    bussnisaccount: Joi.any(),
  })
  
  exports.User = User;

exports.Schema=Schema;