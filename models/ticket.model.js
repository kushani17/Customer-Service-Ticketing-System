const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name: {type:String,trim: true, required: true,maxlength:200},
    createdby: {type:String,trim: true, required: true,maxlength:200},
    insurancetype: {type:Array,trim: true, required: true,maxlength:200},
    insurancetypesubcategory: {type:Array,trim: true, required: true,maxlength:200},
    subject: {type: String, required: true,maxlength:200},
    description: {type: String, required: true,maxlength:1000},
    status: {type:String,required:true,trim: true,maxlength:200},
    priority: {type:Number,required:true,trim: true,maxlength:200},
    date: {type: Date,trim: true, required: true,maxlength:200},
    phone:{type:String,trim: true,maxlength:10},
    email:{type:String,trim: true,maxlength:200},
    agentname:{type:String,trim: true,maxlength:200},
    agentemail:{type:String,trim: true,maxlength:200}

}, {
    timestamps: true,
}

);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;