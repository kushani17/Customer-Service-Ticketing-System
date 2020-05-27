const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    insurancetype:{
        type: String,
        required: true,
        trim: true
    },
    subcategory:{
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
});



const subcategory = mongoose.model('insurancetypessubcategory', userSchema);

module.exports = subcategory;