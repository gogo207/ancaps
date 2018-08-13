var Delivered = require('../model/delivered/delivered.js').Delivered,
//     Accepted = require('../model/booking/booking.js').Accepted,
   express = require('express')
    app = express(),
    mongojs = require('mongojs'),
    date = require("./date"),
    now = require("./time"),
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',["delivereds", "accepteds"]);

function route(app){
    app.post('/driver/delivered',function(req, res){
       	
	var item_id = req.body.item_id
        var id = mongojs.ObjectId(item_id);

        db.accepteds.findAndModify({
            "query":{ "_id": id },
            "remove": true
            },
                                
            function(err,data) {
                
                    if (data) {
                        db.delivereds.insert(data,function(err,data){
                            if(err){
                                res.json({
                                    status:400,
                                    message:"Failed to mark as delivered",
                                    err:err
                                })
                            }
                            else{
                                db.deliveredHistory.insert(data);
                                
                                db.acceptedHistory.findAndModify({
                                    "query":{_id:id},
                                    "remove":true
                                     }, function(err, data){
                                        if(err){
                                            console.log(err)
                                        }else{
                                            console.log(data)
                                        }
                                    });
                                res.json({status:200, message:"Job successfully delivered", data:data});
                            }
                        });
                    } 
                    else {
                    console.log("fake number")
                        res.json({status: 403, message:'This load is not available for accepting'})
                    }
            
            })


    
})
}
module.exports.route = route;
