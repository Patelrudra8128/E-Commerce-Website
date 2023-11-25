const registerTbl = require('../models/registerTbl');

const index = (req,res) => {
    if(res.locals.users){
        return res.redirect('/dashboard');
    }
    return res.render('index');
}

const register = (req,res) => {
    return res.render('register');
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const registerData = async (req,res) => {
    try{
        const{name,email,password,cpassword} = req.body;
        if(cpassword == password){
            let user = await registerTbl.create({
                name : name,
                email : email,
                password : password
            })
            if(user){
                console.log("User registered successfully");
                return res.render('index');
            }else{
                console.log("User not found");
                return res.redirect('back');
            }
        }else{
            console.log("Password and confirm password are not same");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const loginData = (req,res) => {
    return res.redirect('/dashboard');
}

const logout = (req,res) => {
    req.logOut((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}

module.exports = {
    index,
    dashboard,
    register,
    registerData,
    loginData,
    logout
}