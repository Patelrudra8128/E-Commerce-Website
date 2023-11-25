const subcategoryTbl = require('../models/subcategoryTbl');
const categoryTbl = require('../models/categoryTbl');
const productTbl = require('../models/productTbl');

const addSubcategory = async (req,res) => {
    try{
        let category = await categoryTbl.find({});
        return res.render('addSubcategory',{
            category
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryData = async (req,res) => {
    try{
        const{category,subcategory} = req.body;
        let data = await subcategoryTbl.create({
            categoryId : category,
            subcategory : subcategory
        })
        if(data){
            console.log("Subcategory added successfully");
            return res.redirect('/shop');
        }else{
            console.log("Subcategory not added");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteSubcategory = async (req,res) => {
    try{
        let delsubcategory = await subcategoryTbl.findByIdAndDelete(req.query.id);
        if(delsubcategory){
            console.log("Subcategory deleted successfully");
            return res.redirect('back');
        }else{
            console.log("Subcategory not deleted");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const editSubcategory = async (req,res) => {
    try{
        let category = await categoryTbl.find({});
        let oldsubcategory = await subcategoryTbl.findById(req.query.id).populate('categoryId');
        if(oldsubcategory){
            return res.render('editSubcategory',{
                oldsubcategory,
                category
            });
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateSubcategory = async (req,res) => {
    try{
        const{category,subcategory} = req.body;
        let nesubcategory = await subcategoryTbl.findByIdAndUpdate(req.body.editid,{
            categoryId : category,
            subcategory : subcategory
        })
        if(nesubcategory){
            console.log("Subcategory updated successfully");
            return res.redirect('/shop');
        }else{
            console.log("Subcategory not updated");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const filter = async (req,res) => {
    try{
        let filid = await productTbl.find({categoryId : req.query.id});
        if(filid){
            console.log("Done");
            return res.render('shop',{
                filid
            })
        }else{
            console.log("Nope");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addSubcategory,
    subcategoryData,
    deleteSubcategory,
    editSubcategory,
    updateSubcategory,
    filter
}