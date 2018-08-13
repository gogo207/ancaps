// var Booking = require('../model/booking/booking.js').Booking,
 var Accepted = require('../model/accepted/accepted.js').Accepted,
    express = require('express'),
    app = express(),
    mongojs = require('mongojs'),
    date = require("./date"),
    now = require("./time"),
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',["bookings", "accepteds"]);

function route(app){
    app.post('/driver/accepted',function(req, res){

        
	var item_id = req.body.item_id
    var id = mongojs.ObjectId(item_id);
             
      db.accepteds.findOne({driverPhone:req.body.driverPhone}, function(err, driverPhone){
            if(err){
                console.log("error from there")
                res.json({
                    status:404,
                    message:'error occured',
                    err:err
                })
            }
            else if(driverPhone){
                console.log("driver found")
                res.json({
                    status:400,
                    message:'Sorry you cannot accept more than one job at a time',
                    
                })
            }
            
            else {
                db.bookings.findAndModify({
                    "query":{ "_id": id },
                    "update":{$set:{driverPhone:req.body.driverPhone, trackingUrl:req.body.trackingUrl}},
                    },
                                        
                    function(err,data) {
                        if(data){
                            console.log("aiit")
                        }
                        else{
                            console.log("error")
                        }
                    }),
                db.bookings.findAndModify({
                    "query":{ "_id": id },
                    "remove": true
                    },
                                        
                    function(err,data) {
                
                        if (data) {
                            db.accepteds.insert(data, function(err,data){
                                if(err){
                                    res.json({
                                        status:400,
                                        message:"Failed to accept job",
                                        err:err
                                    })
                                }
                                else{
                                    db.acceptedHistory.insert(data);
                        
                                    res.json({
                                        status:200,
                                        message:"Job successfully accepted",
                                        data:data,
                                        

                                    });
                                }
                            });
                        } 
                        else {
                            res.json({
                                status: 403,
                                message:'This load is not available for accepting'
                            })
                        }
        //==========================================================================================================
                    })
                }
        })


    
})
}
module.exports.route = route;
