const mongoose = require('mongoose');
const productScheme = new mongoose.Schema({
    id:Number,
    category_id:Number,
    company_id:Number,
    name: String,
    price:Number,
   source:String

})
    module.exports = mongoose.model("Product", productScheme)