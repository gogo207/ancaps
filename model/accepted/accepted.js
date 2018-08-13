var mongoose = require("mongoose"),
db = global.db;
    

    

const AcceptedSchema = new mongoose.Schema({
        firstName:{
            type: String,
        },
        phone:{
            type: String,
        },
        driverPhone:{
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
        driverPhone:{
            type:String,
        },
        date:{
            type:String,
        },
        time:{
            type:String,
        },
	trackingUrl:{
	    type:String
	}
       
        
    });


 module.exports = mongoose.model('Accepted', AcceptedSchema);
