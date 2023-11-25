const mongoose = require('mongoose');
const productSheama = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    }
})

const product = mongoose.model('product',productSheama);
module.exports = product;