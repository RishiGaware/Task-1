const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    }
});
//collection Part
const collection = new mongoose.model("user",User);
module.exports = collection;