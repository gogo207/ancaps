mongoose = require('mongoose');
// global.db = require('../libs/db/db.js')();
// =======================================================================================
var Accepted = require('../model/accepted/accepted.js').Accepted

function route(app) {
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',['acceptedHistory']);

    // var paymentHistory = require('../model/paymentHistory/paymentHistory.js')
    app.post('/driver/acceptedhistory', function (req, res) {
        db.acceptedHistory.find({driverPhone:req.body.driverPhone}, function (err, data){
            if(err){
                res.json({
                    status:400,
                    message:"please try again"
                })
            }
            else if(!data.length){
                res.json({
                    status:200,
                    message: "Unfortunately there isn't any history to show"
                })
            }
            else{
            res.json({
                status: 200,
                messsage:"view your accepted jobs below",
                data:data
		    });
            }
        })
    })
}

module.exports.route = route;