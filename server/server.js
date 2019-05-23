// Added Express Server
const express = require('express');
const app = express();

const async = require('async');

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

// Added Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config(); // make sure this is above anything requiring API key

app.use(express.static('client/build'));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Added Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Added Mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/waves");

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');
const { Payment } = require('./models/payment');
const { Site } = require('./models/site');

// Middleware
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=================================
//             PRODUCTS
//=================================

app.post('/api/product/shop', (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = parseInt(req.body.skip);
    // Mongo will accept arguments to do the filtering with
    // objs and keys inside
    let findArgs = {};

    // Check if the client request has values to filter
    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            if(key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        } else {

        }
    }

        findArgs['publish'] = true;
            
        Product.
        find(findArgs).
        populate('brand').
        populate('wood').
        sort([[sortBy, order]]).
        skip(skip).
        limit(limit).
        exec((err, articles) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            })
        })
       

})

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

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
      
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({success:false,error});
        res.status(200).send('ok');
    })
})

app.post('/api/users/addToCart',auth,(req,res)=>{

    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                  duplicate = true;  
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date: Date.now()
                } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
});

app.get('/api/users/removeFromCart',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
            { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
            find({'_id':{ $in: array }}).
            populate('brand').
            populate('wood').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
})

app.post('/api/users/successBuy', auth, (req, res)=>{
    let history = [];
    let transactionData = {}

    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase:Date.now(),
            name:item.name,
            brand:item.brand.name,
            id:item._id,
            price:item.price,
            quantity:item.quantity,
            paymentId:req.body.paymentID
        })
    })

    //Payment Dashboard
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    
    User.findOneAndUpdate(
        {_id: req.user._id},
        { $push: {history:history }, $set: { cart:[] } },
        { new: true },
        (err, user)=> {
            if(err) return res.json({success:false, err});

            const payment = new Payment(transactionData);
            payment.save((err, doc)=> {
                if(err) return res.json({success:false, err});
                let products = [];
                console.log(doc);
                doc.product.forEach(item => {
                    products.push({id:item._id, quantity:item.quantity})
                })
                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        {_id: item.id},
                        { $inc: {
                            "sold":item.quantity
                        }},
                        {new: false},
                        callback
                    )
                }, (err) => {
                        if(err) return res.json({success:false, err})
                        res.status(200).json({
                            success:true,
                            cart: user.cart,
                            cartDetail:[]
                        })
                })
            })
        }
    )
})

app.post('/api/users/update_profile',auth,(req,res)=>{

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    );
});

//==================================
//           SITE
//==================================

// app.get('/api/site/site_data',(req,res)=>{
//     Site.find({},(err,site)=>{
//         if(err) return res.status(400).send(err);
//         if (site) {
//             res.status(200).send(site)
//         }
//         // res.status(200).send(site[0].siteInfo)
//     });
// });



// app.post('/api/site/site_data',auth,admin,(req,res)=>{
//     Site.findOneAndUpdate(
//         { _id: req.params.id},
//         { "$set": { siteInfo: req.body }},
//         { new: true },
//         (err,doc )=>{
//             if(err) return res.json({success:false,err});
//             return res.status(200).send({
//                 success: true,
//                 siteInfo: doc.siteInfo
//             })
//         }
//     )
// })

// DEFAULT

if(process.env.NODE_ENV === 'production' ){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3005;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
});

