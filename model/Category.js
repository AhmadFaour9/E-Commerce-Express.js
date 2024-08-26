const mongoose = require('mongoose');
const categoryScheme = new mongoose.Schema({
   id:Number
    ,category:String

})
    module.exports = mongoose.model("Category", categoryScheme)