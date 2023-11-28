const express = require('express');
const app = express();
const session = require('express-session');
const customerRoute = require('./Routes/auth_users.js').authenticated;
const generalRoute  = require('./Routes/general.js'); // Updated file path
app.use(express.json());

app.use('/customer', session({secret:"123456", resave:true, saveUninitialized:true}));

app.use('/customer/auth',function auth(req, res, next){
    if(req.session && req.session.customerId){
        return next();
    }else{
        return res.redirect('/customer/login');
    }

});

app.use('/customer', customerRoute);
app.use('/', generalRoute);

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));