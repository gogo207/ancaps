var mongoose = require("mongoose");
var db = global.db;
    

    
const TrackingSchema = new mongoose.Schema({

        item_id:{
            type:String,
        },
        messagebooked:{
                message:String,
                datebooked:{type:String},
                timebooked:{type:String,
                },

        messageConfirmed:{
                message:{type:String},
                dateConfirm:{type:String},
                timeConfirmed:{type:String}
                
            },
        },
        messageProcess:{
            message:{type:String},
            dateProcess:{type:String},
            timeProcess:{type:String}
            
        },
               
    });
  

module.exports = mongoose.model('Tracking', TrackingSchema);