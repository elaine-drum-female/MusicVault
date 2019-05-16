const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true,
        unique: 1
    },

    password: {
        type:String,
        required:true,
        minLength:8
    },

    name: {
        type:String,
        required:true,
        maxLength: 100
    },

    cart: {
        type:Array,
        default: []
    },

    history: {
        type:Array,
        default: []
    },

    role: {
        type:Number,
        default: 0
    },

    token: {
        type:String
    }

});

//Saving this before going through server
userSchema.pre('save', function(next) {
    // Referencing this user and not the function
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt) {
            // kills process of whatever is being run (i.e. posting req) before moving forward
            if(err) return next (err);
    
            // Use password of user to hash out password
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

//Created the comparePassword method
userSchema.methods.comparePassword = function(hasNoHash, cb) {
    bcrypt.compare(hasNoHash, this.password, function(err, doesMatch) {
        if(err) return cb(err);
        cb(null, doesMatch);
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User }