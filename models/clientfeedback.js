const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientFeedbackSchema = new Schema({
    ticketid: {type:String,trim: true,unique: true,required: true,maxlength:200},
    rating: {type:String,trim: true, required: true,maxlength:200},
    description: {type: String, trim: true,maxlength:1000},

}, {
    timestamps: true,
}
);

const ClientFeedback = mongoose.model('ClientFeedback', clientFeedbackSchema);

module.exports = ClientFeedback;