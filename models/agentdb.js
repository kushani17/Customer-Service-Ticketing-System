const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const agent = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength:200
},
role: {
  type: String,
  required: true,
  trim: true,
  maxlength:200
},
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength:10
},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength:200
},
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength:200
},
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength:200
},
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength:200
},
  zip: {
    type: String,
    required: true,
    trim: true,
    maxlength:5
},
  status: String,
  date: {
    type: String,
    default: Date.now()
    
  }
});
const agentdb = mongoose.model('employees', agent);

module.exports = agentdb;
