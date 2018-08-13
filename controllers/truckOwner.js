
var truckOwner = require("../model/truckOwner/truckOwner-db.js");
bcrypt   = require('bcryptjs');
crypto   = require('crypto');
mongoose = require('mongoose');


function route(app) {
    app.post("/register/truckOwner", function (req, res) {
        var token = crypto.randomBytes(2).toString('hex')
        var tokenExpires = Date.now() + 300000// 5 minutes
        var form = {

            accessType: "TRUCKOWNER",
            phone: req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            NumOfTrucks: req.body.NumOfTrucks,
            IDType: req.body.IDType,
            IDNum: req.body.IDNum,
            token,
            tokenExpires
        }

        truckOwner.create(form, function (err, data) {
            if (err) {
                res.json({
                    status: 400,
                    message: "Could not create user",
                    err: err
                });
            } else {
                res.json({
                    status: 200,
                    message: "User created",
                    data: data
                });
            }
        });
        var accountSid = 'AC7afc81c8e3a18610731ec557db201e5c';
        var authToken = '2c0eb9fffa7ff12153fdcfe1aaa9c124';

        //require the Twilio module and create a REST client 
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
            to: "+234" + req.body.phone,
            from: "+14243528976",
            body: "Your OTP is " + form.token,
        }, function (err, message) {
            console.log(message);
        });

    });
    app.put('/truckOwner/logintoken', function (req, res, next) {
        if (req.body.otp) {
            truckOwner.authenticateOtp(req.body.otp, function (error, user) {
                if (error || !user) {
                    res.json({
                        "status": 404,
                        "message": "record not found",
                        err: error
                    });


                } else {
                    user.token = undefined;
                    user.tokenExpires = undefined;
                    user.save()
                    res.json({
                        "status": 200,
                        "message": "record found",
                        data: user
                    });

                }
            });
        }
    });
    
    app.get("/all-truckOwner", function (req, res) {
        truckOwner.find({}, function (err, data) {
            if (err) {
                console.log("error!")
                res.json({
                    status: 404,
                    message: "Infomation not found",
                    err: err
                });
            }
	    else if(!data.length){
                res.json({
		        status:201,
                message: "Unfortunately there isn't any Truck owners at the moment, please try again later"
            })
            } else {
                res.json({
                    status: 200,
                    message: "view list of registered drivers",
                    data: data
                });
            }
        })
    })


    app.post('/login/truckOwner', function (req, res, next) {
        if (req.body.phone && req.body.password) {
            truckOwner.authenticate(req.body.phone, req.body.password, function (error, user) {
                if (error || !user) {
                    res.json({
                        status: 404,
                        message: "Please check the provided data and try again",
                        err: error
                    });
                    return next(error);

                } else {
                    req.session.userId = user._id;
                    res.json({
                        status: 200,
                        message: "Hi Truck owner, you can observing your "
                    });

                }
            });
        }
    });

    // app.post('/findTruckOwner', (req, res)=>{
    //     return truckOwner.findOne({phone:req.body.phone})
    //         .then(doc =>{
    //             return res.status(200).json({status:200, message:"TruckOwner's details below", doc:doc})
    //         })
    //         .catch(err=>{
    //             return res.status(400).json(err)
    //         })
    // })

    
    app.get('/findtruckOwner/:phone', (req, res)=>{
        
        // console.log(req.params.phone)
        return truckOwner.find({phone:req.params.phone},[])
            .then(doc =>{
                // console.log(doc)
                return res.status(200).json({status:200, message:"TruckOwner's details below", doc:doc})
            })
            
            .catch(err=>{
                return res.status(400).json(err)
            })
    })

    app.post('/deleteTruckOwner', (req, res)=>{
        return truckOwner.findOneAndRemove({phone:req.body.phone})
            .then(doc =>{
                return res.status(200).json({status:200, message:"TruckOwner's account successfully deleted"})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    })

    app.post('/editTruckOwner', (req, res)=>{

        return truckOwner.findOneAndUpdate({phone:req.body.phone}, req.body
            )
            .then(doc=>{
                return res.status(200).json({status:200, message:"TruckOwner account successfully updated"})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    });

    app.post("/truckOwner/account/forgot", function (req, res) {
        
                // See if the user exist
                var user = truckOwner.findOne({ phone: req.body.phone }, function (error, user) {
                    if (user) {
                        user.resetPasswordToken = crypto.randomBytes(2).toString('hex');
                        user.resetPasswordExpires = Date.now() + 3000000; // 5 minutes
                        user.save();
                        var accountSid = 'AC7afc81c8e3a18610731ec557db201e5c';
                        var authToken = '2c0eb9fffa7ff12153fdcfe1aaa9c124';
        
                        //require the Twilio module and create a REST client 
                        var client = require('twilio')(accountSid, authToken);
        
                        client.messages.create({
                            to: "+234" + req.body.phone,
                            from: "+14243528976",
                            body: "Your OTP is " + user.resetPasswordToken,
                        }, function (err, message) {
                            console.log(message);
                        });
        
                        res.json({
                            status: 200,
                            otpMessage: "A password reset has been sent to your phone",
                    
        
                        });
                    }
                });
            });
            app.post('/truckOwner/otplogin', function (req, res, next) {
                if (req.body.resetPasswordToken) {
                    truckOwner.authenticateWithOtp(req.body.resetPasswordToken, function (error, user) {
                        if (error || !user) {
                            res.json({
                                "status": 404,
                                "message": "record not found",
                                err: error
                            });
        
        
                        } else {
                            res.json({
                                status: 200,
                                otpMessage: "Reset your password"
        
                            });
                        }
                    });
                }
            });
            app.post('/truckOwner/account/reset', function (req, res, error) {
                if (req.body.password !== req.body.confirmPassword) {
                    return res.json({
                        status: 404,
                        message: "Password does not match"
                    });
        
                };
                var user = truckOwner.findOne({
                    resetPasswordToken: req.body.resetPasswordToken,
                    resetPasswordExpires: { $gt: Date.now() }
        
                }, function (err, user) {
        
                    if (!user) {
                        return res.json({
                            status: 401,
                            message: "Password reset token is invalid or has expired"
                        });
                    }
                    bcrypt.hash({ password: req.body.password }, 10, function (err, hash) {
                        if (err) {
                            console.log(err);
                        }
                        user.password = hash;
                        user.password = req.body.password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save()
        
                        return res.json({
                            status: 200,
                            message: "You have succesfully reset your password"
                        });
                    })
                })
        
            });
        }


module.exports.route = route;
