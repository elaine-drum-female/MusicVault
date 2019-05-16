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


//==================================
//           USERS
//==================================

app.post('/api/users/register', (req, res) => {
   const user = new User(req.body);
   user.save((err, doc) => {
    if(err) return res.json({success: false, err});
    res.status(200).json({
        success:true,
        userData: doc
    });
   });
});




















const port = process.env.PORT || 3005;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
});