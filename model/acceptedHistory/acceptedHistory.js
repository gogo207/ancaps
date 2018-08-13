var mongoose = require("mongoose"),
db = global.db;
    

    

const AcceptedHistorySchema = new mongoose.Schema({
        firstName:{
            type: String,
        },
        phone:{
            type: String,
        },
        itemsType:{
            type: String,
        },
        origin: {
            type: String,
        },
        destination: {
            type: String,
        },
        distance:{
            type:String
        },
        price:{
            type: String
        },
        date:{
            type:String,
        },
        time:{
            type:String,
        }
    });


 module.exports = mongoose.model('AcceptedHistory', AcceptedHistorySchema);
