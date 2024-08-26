const mongoose = require('mongoose');
const companyScheme = new mongoose.Schema({
   id:Number
    ,company:String,
    logo:String

})
    module.exports = mongoose.model("Company", companyScheme)