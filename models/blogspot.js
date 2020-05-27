const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blog = new Schema({
    name:{type:String,required: true,trim: true,maxlength:200},
    company:{type:String,trim: true,maxlength:200},
    insurancetype:{type:Array,trim: true,required: true,maxlength:200},
    insurancetypesubcategory:{type:Array,trim:true,maxlength:200},
    phone:{type:String,trim: true,required: true,maxlength:10},
    email:{type:String,trim: true,unique: true,required: true,maxlength:200},
    city:{type:String,trim: true,required: true,maxlength:200},
    state:{type:String,trim: true,required: true,maxlength:200},
    refferedby:{type:String,trim: true, maxlength:200},
    date:{
        type:String,
        default:Date.now()
    }
});
const blogspot = mongoose.model('Clients',blog);

module.exports = blogspot;