"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create database scheme
let userDataScheme = new Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
},
{
    collection: 'userdata'
});


// Set default value for dateCreated
userDataScheme.pre('save', next => {
  var now = new Date();
  if(!this.dateCreated) {
    this.dateCreated = now;
  }
  next();
});


module.exports = mongoose.model('userData', userDataScheme);