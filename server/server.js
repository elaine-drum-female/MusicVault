// Added Express Server
const express = require('express');
const app = express();

// Added Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Added Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Added Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/waves");

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');

// Middleware
const { auth } = require('./middleware/auth');

//==================================
//           BRAND
//==================================

app.post('/api/product/brand',auth,(req,res)=>{
    const brand = new Brand(req.body);

    brand.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            brand: doc
        });
    });
});

//==================================
//           USERS
//==================================

app.get('/api/users/auth' , auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            cart: req.user.cart,
            history: req.user.history
    });
});

app.post('/api/users/register', (req, res) => {
   const user = new User(req.body);
   user.save((err, doc) => {
    if(err) return res.json({success: false, err});
    res.status(200).json({
        success:true
    });
   });
});

app.post('/api/users/login', (req, res) => {
    // Find the email
        User.findOne({'email': req.body.email}, (err, user) => {
            // If no user then send a message
            if(!user) return res.json({loginSuccess: false, message: 'Auth failed. Email not found!'});
            //Compare password and state whether it matches or not
            user.comparePassword(req.body.password, (err, doesMatch) => {
                if(!doesMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('x_auth' , user.token).status(200).json({
                    loginSuccess: true
                    });
                });
            });
        });
  
});

app.get('/api/user/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            });
        }
    )
});
















const port = process.env.PORT || 3005;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
});