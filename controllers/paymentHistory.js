mongoose = require('mongoose');
global.db = require('../libs/db/db.js')();
// =======================================================================================
// Code for searching all entries
// =======================================================================================

function route(app) {
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',['bookingHistorys']);

    // var paymentHistory = require('../model/paymentHistory/paymentHistory.js')
    app.post('/paymenthistory', function (req, res) {
        db.bookingHistorys.find({phone:req.body.phone}, function (err, data){
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
                messsage:"view your payment/booking history below",
                data:data
		    });
            }
        })
    })

    app.get('/all/paymenthistory', function(req, res){
        db.bookingHistorys.find({}, function(err, data){
            if(err){
                res.json({
                    status:403,
                    message:"sorry about this but an error has occured",
                    err:err
                })
            }
            else{
                res.json({
                    status:200,
                    message:"veiw all bookings below",
                    data:data
                })
            }
        
        })
    
    })
}

module.exports.route = route;