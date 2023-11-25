const express = require('express');
const app = express();
const port = 1000;
const db = require('./config/database');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passportLocalStrategy');

app.use(session({
    name : 'rudra',
    secret : 'patel',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(express.static(path.join(__dirname,'/public')));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.set('view engine','ejs');
app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

app.use('/',require('./routes/indexRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not ready");
        return false;
    }
    console.log("Server is running on port : "+port);
})