mongoose = require('mongoose');
global.db = require('../libs/db/db.js')();
// =======================================================================================
// Code for searching all entries
// =======================================================================================

function route(app) {

    var User = require("../model/booking/booking.js")
    app.get('/available-load', function (req, res) {
        User.find({}, function (err, data){
            if(err){
                res.json({status:400,message:"please try again"})
            }
            else if(!data.length){
                res.json({status:200,
                message: "Unfortunately there isn't any load at the moment, please try again later"
            })
            }
            else{
            res.json({
                status: 200,messsage:"view the available list below",
                data:data
		});
            }
        })
    })
// =======================================================================================
// Filter to find destination to pick item
// =======================================================================================

    var User = require("../model/booking/booking.js")
    app.get('/filter/pickup_point/:location', function(req, res){
        console.log(req.params.location);
        // var location = "lagos"
        // User.find({locationFrom:location}, function (err, data){
            var location = req.params.location;
        User.find({locationFrom:location}, function (err, data){
           
            if(err){
                res.json({
                    status:400,
                    message:"Sorry your request could not be served "
                })
            }
            else if(!data.length){
                res.json({status:200,message:" we have 0 delivery from "+ location })
            }            
            else{
                res.json({
                    status: 200,
                    messsage:"view the available delivery from "+ location +" below",data:data
                });
            }
        })
    })
// =======================================================================================
// Filter to find destination to deliver
// =======================================================================================

    var User = require("../model/booking/booking.js")
    app.get('/filter/delivery_point', function(req, res){
        var location = "london"
        User.find({locationTo:location}, function (err, data){
                     
           if(err){
                res.json({
                    status:400,
                    message:"Search failed"+ location
                })
            }
            else if(!data.length){
                res.json({status:300,message:" we have 0 delivery from "+ location })
            } 
            else{
                res.json({
                    status: 200,
                    messsage:"view the available delivery to " + location +" list below",data:data
                });pickup_point
            }
        })
    })
}


module.exports.route = route;
