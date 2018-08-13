var Booking = require("../model/booking/booking.js");
var mongoose = require('mongoose')
var date = require("./date")
var now = require("./time")

mongojs = require('mongojs'),
db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',["bookings", 'bookingHistorys']);


function route(app){

    // user registration
    app.post("/shipper/booking", function(req, res){
       
        var form = {

            payment_Id: req.body.payment_Id,
            payment_For: req.body.payment_For,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            origin: req.body.origin,
            destination: req.body.destination,
            distance: req.body.distance,
            amount: req.body.amount,
            driverPhone: "00000000000",
            trackingUrl:"www",
            email: req.body.email,
            date: date,
            time: now,
            
        }

        Booking.create(form, function(err, data){
            if(err) {
                res.json({ 
                    status: 404, 
                    message: "Booking failed", 
                    err: err
                });
            }else {
                db.bookingHistorys.insert(data)
                res.json({ 
                    status: 200, 
                    message: "Booking completed",
                    data: data
                });
            }
        })
    })

}
module.exports.route = route;
