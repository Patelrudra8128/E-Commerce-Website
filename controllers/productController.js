const productTbl = require('../models/productTbl');
const subcategoryTbl = require('../models/subcategoryTbl');
const categoryTbl = require('../models/categoryTbl');

const addProduct = async (req,res) => {
    try{
        let category = await categoryTbl.find({});
        let subcategory = await subcategoryTbl.find({});
        return res.render('addProduct',{
            category,
            subcategory
        });
    }catch(err){
        console.log(err);
        return false;
    }
    
}

const productData = async (req,res) => {
    try{
        const{category,subcategory,name,description,price,quantity} = req.body;
        let product = await productTbl.create({
            categoryId : category,
            subcategoryId : subcategory,
            image : req.file.path,
            name : name,
            description : description,
            price : price,
            quantity : quantity
        })
        if(product){
            console.log("Product added successfully");
            return res.redirect('/shop');
        }else{
            console.log("Product not added");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {
    addProduct,
    productData
}