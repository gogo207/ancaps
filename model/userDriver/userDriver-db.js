var db = global.db;
var mongoose = require("mongoose");
    bcrypt = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const DriverSchema = new mongoose.Schema({
    access: {
        type: String,
    },
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
    trackingUrl:{
        type: String,
        required:["true, please pass in your google app location link"]
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
        required: [true, 'Please enter your address'],
        
    },
    DrivLicNo:  {
        type:String,
        required: [true, 'Please enter your Driver Licence Number'],
        unique: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires:  Date,
    token: String,
    tokenExpires: Date
    
   
});


    DriverSchema.pre('save', function(next){
        var driver = this;
        bcrypt.hash(driver.password, 10, function(err, hash){
            if(err){
                return next(err);
            }
            driver.password= hash;
            next()
        })
    })
    
    
    DriverSchema.statics.authenticate = function (phone, password, callback){
        var Driver = this;
        Driver.findOne({ phone: phone}).exec(function (err, driver){
            if(err){
                return callback(err)
            }else if(!driver){
                var err = new Error('Driver not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, driver.password, function(err, result){
                if (result === true){
                    return callback(null, driver);
                }
                else{
                    return callback()
                }
                
            })
        })
    }

    DriverSchema.statics.authenticateWithOtp = function ( otp, callback){
        Driver.findOne({resetPasswordToken: otp}).exec(function (err, driver){
            if(err){
                return callback(err)
            }else if(!driver){
                var err = new Error('Driver not found');
                err.status = 401;
                return callback(err);
            }
            if(driver.resetPasswordExpires >= Date.now()){
                return callback(null, driver);
            }else{
                var err = new Error('OTP Expired');
                err.status = 401;
                return callback(err);
            }
                
           
        })
    }
    DriverSchema.statics.authenticateOtp = function ( otp, callback){
        Driver.findOne({token: otp}).exec(function (err, user){
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
    


module.exports = mongoose.model('Driver', DriverSchema);
