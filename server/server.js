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
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

// Middleware
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=================================
//             PRODUCTS
//=================================

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

//BY SELL
app.get('/api/product/articles',(req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().populate('brand').
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, articles) => {
        if(err) return res.status(400).send(err);
        res.send(articles);
    }); 
});

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/articles_by_id',(req,res)=>{
    // Searching for the query type
    let type = req.query.type;
    // Starting with the id
    let items = req.query.id;

    if(type === "array"){
        //Split the ids with a comma
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            // Return the item and pass it into items[] convert to objectID in database
            return mongoose.Types.ObjectId(item)
        });
    }

    Product.
    find({ '_id':{$in:items}}). // this takes a single value or array
    populate('brand').
    populate('wood').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    });
});


app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        });
    });
});



//==================================
//           WOODs
//==================================
app.post('/api/product/wood', auth, admin,(req, res) => {
    const wood = new Wood(req.body);
    wood.save((err, docs)=> {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            wood: docs
        });
    });
});

app.get('/api/product/woods' , (req, res)=> {
    Wood.find({}, (err, woods)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(woods);
    });
})

//==================================
//           BRAND
//==================================

app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand = new Brand(req.body);

    brand.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            brand: doc
        });
    });
});

app.get('/api/product/getbrands', (req, res) => {
    Brand.find({}, (err, getbrands) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(getbrands);
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
        success:true,
        userdata: doc
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

app.get('/api/users/logout',auth,(req,res)=>{
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