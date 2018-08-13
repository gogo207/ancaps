var Completed = require('../model/completed/completed.js').Completed,
   express = require('express')
    app = express(),
    mongojs = require('mongojs'),
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',["completeds", "delivered"]);

function route(app){
    app.post('/shipper/completed',function(req, res){
       	
	var item_id = req.body.item_id
    var id = mongojs.ObjectId(item_id);

        db.delivereds.findAndModify({
            "query":{ "_id": id },
            "remove": true
            },
                                
            function(err,data) {
                
                    if (data) {
                        db.completeds.insert(data,function(err,data){
                            if(err){
                                res.json({
                                    status:400,
                                    message:"Failed to mark as completed",
                                    err:err
                                })
                            }
                            else{
                                res.json({
                                    status:200,
                                    message:"Job successfully completed",
                                    data:data

                                });
                            }
                        });
                    } 
                    else {
                    console.log("fake number")
                        res.json({
                            status: 403,
                            message:'This load is not available for accepting'
                            })
                    }
            
            })


    
})
}
module.exports.route = route;
