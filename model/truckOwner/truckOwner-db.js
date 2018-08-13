// var db = global.db;
var mongoose = require("mongoose");
bcrypt = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const truckOwnerSchema = new mongoose.Schema({

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

NumOfTrucks: {
    type: String,
    required: [true, 'Please enter the number of register trucks you have'],
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


truckOwnerSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password= hash;
        next()
    })
})




truckOwnerSchema.statics.authenticate = function (phone, password, callback){
    var truckOwner
    truckOwner.findOne({ phone: phone}).exec(function (err, user){
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

truckOwnerSchema.statics.authenticateWithOtp = function ( otp, callback){
    truckOwner.findOne({resetPasswordToken: otp}).exec(function (err, user){
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
truckOwnerSchema.statics.authenticateOtp = function ( otp, callback){
    truckOwner.findOne({token: otp}).exec(function (err, user){
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


module.exports = mongoose.model('truckOwner', truckOwnerSchema);
