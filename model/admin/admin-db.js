// var db = global.db;
var mongoose = require("mongoose");
    bcrypt = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const adminSchema = new mongoose.Schema({        
    password: {
        type: String,
        required: [true, 'Please add a password 6 digit minimum'],
        minlength:6

    },  
    username: {
        type: String,
        required: [true, 'Please enter a username'],        

    }, 
    
});


    adminSchema.pre('save', function(next){
        var admin = this;
        bcrypt.hash(admin.password, 10, function(err, hash){
            if(err){
                return next(err);
            }
            admin.password= hash;
            next()
        })
    })

    
    
    
    adminSchema.statics.authenticate = function (username, password, callback){
        var admin = this;
        admin.findOne({username: username}).exec(function (err, user){
            if(err){
                return callback(err)
            }else if(!user){
                var err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, admin.password, function(err, result){
                if (result === true){
                    return callback(null, user);
                }
                else{
                    return callback()
                }
                
            })
        })
    }

module.exports = mongoose.model('Admin', adminSchema);