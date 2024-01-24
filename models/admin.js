const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
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
const collection = new mongoose.model("admin",Admin);
module.exports = collection;