var mongoose = require("mongoose"),
db = global.db;
    

    
const BookingSchema = new mongoose.Schema({
        payment_Id:{
            type: String,
            required: [true, 'ID missing'],
        },
        payment_For:{
            type: String,
            required: [true, 'payment for missing'],
        },
        firstName:{
            type: String,
            required: [true, 'Please add a first name'],
            
        },
        lastName:{
            type: String,
            required: [true, 'Please add a last name'],
        },  
        phone:{
            type: String,
            required: [true, 'Please add a valid phone number'],
        },
        origin: {
            type: String,
            required: [true, 'Please add a FROM (PICKUP LOCATION)'],
        },
        destination: {
            type: String,
            required: [true, 'Please add a TO (DELIVERY DESTINATION)'],
        },
        distance:{
            type:String,
            required: [true, 'Please add a total distance'],
        },
        amount:{
            type: String,
            required: [true, 'Please add a Amount'],
        },
        email:{
            type: String,
            required: [true, 'your email is missing'],
        },
        driverPhone:{
             type:String,
        },
        trackingUrl:{
            type: String
        },
        date:{
            type:String,
        },

        time:{
            type:String,
        },
       
    });

module.exports = mongoose.model('Booking', BookingSchema);

