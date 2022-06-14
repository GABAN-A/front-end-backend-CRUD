// const mongoose = require('mongoose');
// const userschema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     dropDups: true, 
//   },
//   email: {
//     type: String,
//     index: true,
//     unique: true,
//     required: true,
//     dropDups: true 
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   bussnisaccount: {type:Boolean,required:true},
//   Date:{type:Date},
// });
// // define the schema
// // create Product model
// const User = mongoose.model('User', userschema);

// // create new product object 
// function NewUser() {
//   const user = new User({
//     name: data.name,
//     email: data.email,
//     password: data.password,
//     bussnisaccount: a,
//     Date: new Date,
//   });
//   user.save().then((result) => console.log(result));
// }
// function NewUser() {
//   const user = new User({
//     name: data.name,
//     email: data.email,
//     password: data.password,
//     bussnisaccount: a,
//     Date: new Date,
//   });
//   arrOf={...user}
 
// console.log("these is",(Object.values(arrOf)[4]))
// }