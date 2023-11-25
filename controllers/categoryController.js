const categoryTbl = require('../models/categoryTbl');
const subcategoryTbl = require('../models/subcategoryTbl');
const productTbl = require('../models/productTbl');
const registerTbl = require('../models/registerTbl');

const shop = async (req,res) => {
    try{
        let category = await categoryTbl.find({});
        let subcategory = await subcategoryTbl.find({}).populate('categoryId');
        let products = await productTbl.find({}).populate('subcategoryId').populate('categoryId');
        let user = res.locals.users;
        let record = [];
        if(category){
            console.log("Category fetched successfully");
            return res.render('shop',{
                category,
                subcategory,
                products,
                user,
                record
            });
        }else{
            console.log("Category not fetched");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const addCategory = (req,res) => {
    return res.render('addCategory');
}

const categoryData = async (req,res) => {
    try{
        let category = await categoryTbl.create({
            category : req.body.category
        })
        if(category){
            console.log("Category added successfully");
            return res.redirect('/shop');
        }else{
            console.log("Category not added");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteCategory = async (req,res) => {
    try{
        let delCategory = await categoryTbl.findByIdAndDelete(req.query.id);
        if(delCategory){
            console.log("Category Deleted Successfully");
            return res.redirect('/shop');
        }else{
            console.log("Category not deleted");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const editCategory = async (req,res) => {
    try{
        let oldCategory = await categoryTbl.findById(req.query.id);
        if(oldCategory){
            return res.render('editCategory',{
                oldCategory
            });
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateCategory = async (req,res) => {
    try{
        let neCategory = await categoryTbl.findByIdAndUpdate(req.body.editid,{
            category : req.body.category 
        });

        if(neCategory){
            console.log("Category updated successfully");
            return res.redirect('/shop');
        }else{
            console.log("Category not updated");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    shop,
    categoryData,
    addCategory,
    deleteCategory,
    editCategory,
    updateCategory
}