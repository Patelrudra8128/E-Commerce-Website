const cartTbl = require('../models/cartTbl');
const productTbl = require('../models/productTbl');
const subcategoryTbl = require('../models/subcategoryTbl')
const categoryTbl = require('../models/categoryTbl');
const registerTbl = require('../models/registerTbl');



const cart = async (req,res) => {
    try{
        let cart = await cartTbl.find({});
        if(cart){
            console.log("Products fetched successfully");
            return res.render('cart',{
                cart
            });
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const addtocart = async (req,res) => {
    try{
        let product = await productTbl.findById(req.query.id);
        if(product){
            let checkCart = await cartTbl.findOne({ productId : req.query.id});
            if(checkCart){
                console.log("Product already exists in cart");
                return res.redirect('back');
            }else{
                let cartItem = await cartTbl.create({
                    productId : product.id,
                    image : product.image,
                    name : product.name,
                    description : product.description,
                    price : product.price,
                    quantity : product.quantity,
                });
                if(cartItem){
                    console.log("Product added to cart successfully");
                    return res.redirect('back');
                }else{
                    console.log("Product not added to cart");
                    return res.redirect('back');
                }
            }
        }else{
            console.log("Product not found");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteCartItem = async (req,res) => {
    try{
        let cartItem = await cartTbl.findByIdAndDelete(req.query.id);
        if(cartItem){
            console.log("Item deleted from cart successfully");
            return res.redirect('back');
        }else{
            console.log("Item not deleted");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const filtersubcategory = async (req,res) => {
    try{
        let r= req.query.id;

        let category = await categoryTbl.find({});
        let subcategory = await subcategoryTbl.find({}).populate('categoryId');
        let products = await productTbl.find({}).populate('subcategoryId').populate('categoryId');
        let user = res.locals.users;


        let record = await productTbl.find({subcategoryId : r});
        let product = await productTbl.find({});
        return res.render('shop',{
            category,
            subcategory,
            products,
            user,
            record
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    cart,
    addtocart,
    filtersubcategory,
    deleteCartItem
}