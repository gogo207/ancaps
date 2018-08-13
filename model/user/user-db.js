// var db = global.db;
var mongoose = require("mongoose");
    bcrypt = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const UserSchema = new mongoose.Schema({
    
    phone: {
        type: String,
        required: [true, 'Please enter a phone number'],
        unique: true,
        maxlength: 11,
        minlength: 11
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'Please add a password 6 digit minimum'],
        minlength:6

    },
    address: {
        type: String,
        required: [true, 'Please enter your house address'],
    },
    IDType: {
        type: String,
        required: [true, 'Please select identification card type'],
        
    },
    IDNum: {
        type: String,
        required: [true, 'Please enter a valid ID number'],
        unique: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires:  Date,
    token: String,
    tokenExpires: Date
   
});


    UserSchema.pre('save', function(next){
        var user = this;
        bcrypt.hash(user.password, 10, function(err, hash){
            if(err){
                return next(err);
            }
            user.password= hash;
            next()
        })
    })

    
    
    
    UserSchema.statics.authenticate = function (phone, password, callback){
        var User = this;
        User.findOne({ phone: phone}).exec(function (err, user){
            if(err){
                return callback(err)
            }else if(!user){
                var err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result){
                if (result === true){
                    return callback(null, user);
                }
                else{
                    return callback()
                }
                
            })
        })
    }

    UserSchema.statics.authenticateWithOtp = function ( otp, callback){
        User.findOne({resetPasswordToken: otp}).exec(function (err, user){
            if(err){
                return callback(err)
            }else if(!user){
                var err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            if(user.resetPasswordExpires >= Date.now()){
                return callback(null, user);
            }else{
                var err = new Error('OTP Expired');
                err.status = 401;
                return callback(err);
            }
                
           
        })
    }
    UserSchema.statics.authenticateOtp = function ( otp, callback){
        User.findOne({token: otp}).exec(function (err, user){
            if(err){
                return callback(err)
            }else if(!user){
                var err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            if(user.tokenExpires >= Date.now()){
                return callback(null, user);
            }else{
                var err = new Error('OTP Expired');
                err.status = 401;
                return callback(err);
            }
                
           
        })
    }    
    

module.exports = mongoose.model('Shipper', UserSchema);