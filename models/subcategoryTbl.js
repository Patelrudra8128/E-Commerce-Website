const mongoose = require('mongoose');

const categoryTbl = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    subcategory : {
        type : String,
        required : true
    }
})

const category = mongoose.model('subcategory',categoryTbl);
module.exports = category;