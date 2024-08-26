const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    Username: String,
    Password:String,
    Email:String,
    Gender:String,

})
    module.exports = mongoose.model("Users", userScheme)