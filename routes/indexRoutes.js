const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerController');
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const passport = require('passport');
const multer = require('multer');

const fileUpload = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+file.originalname);
    }
})
const imageupload = multer({storage : fileUpload}).single('image');


routes.get('/',registerController.index);
routes.get('/dashboard',passport.checkAuthentication,registerController.dashboard);
routes.get('/register',registerController.register);
routes.post('/registerData',registerController.registerData);
routes.post('/loginData',passport.authenticate('local',{ failureRedirect : '/'}),registerController.loginData);
routes.get('/logout',registerController.logout);

routes.get('/shop',passport.checkAuthentication,categoryController.shop);
routes.get('/addCategory',passport.checkAuthentication,categoryController.addCategory);
routes.post('/categoryData',passport.checkAuthentication,categoryController.categoryData);
routes.get('/deleteCategory',passport.checkAuthentication,categoryController.deleteCategory);
routes.get('/editCategory',passport.checkAuthentication,categoryController.editCategory);
routes.post('/updateCategory',passport.checkAuthentication,categoryController.updateCategory);

routes.get('/addSubcategory',passport.checkAuthentication,subcategoryController.addSubcategory);
routes.post('/subcategoryData',passport.checkAuthentication,subcategoryController.subcategoryData);
routes.get('/deleteSubcategory',passport.checkAuthentication,subcategoryController.deleteSubcategory);
routes.get('/editSubcategory',passport.checkAuthentication,subcategoryController.editSubcategory);
routes.post('/updateSubcategory',passport.checkAuthentication,subcategoryController.updateSubcategory);

routes.get('/addProduct',passport.checkAuthentication,productController.addProduct);
routes.post('/productData',imageupload,passport.checkAuthentication,productController.productData);


routes.get('/cart',passport.checkAuthentication,cartController.cart);
routes.get('/addtocart',passport.checkAuthentication,cartController.addtocart);
routes.get("/deleteCartItem",passport.checkAuthentication,cartController.deleteCartItem);

routes.get('/filter',passport.checkAuthentication,subcategoryController.filter);

routes.get('/filtersubcategory',cartController.filtersubcategory);

module.exports = routes;