
var Driver = require("../model/userDriver/userDriver-db.js");
bcrypt = require('bcryptjs');
crypto = require('crypto');
mongoose = require('mongoose');

//The Driver creation snippet
function route(app) {
    app.post("/register/driver", function (req, res) {
        var token = crypto.randomBytes(2).toString('hex')
        var tokenExpires = Date.now() + 300000// 5 minutes
        var form = {

            accessType: "SHIPPER",
            phone: req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            trackingUrl:req.body.trackingUrl,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            DrivLicNo:req.body.DrivLicNo,
            token,
            tokenExpires
        }

        Driver.create(form, function (err, data) {
            if (err) {
                res.json({
                    status: 400,
                    message: "Could not create driver",
                    err: err
                });
            } else {
                res.json({
                    status: 200,
                    message: "Driver created",
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
    app.put('/driver/logintoken', function (req, res, next) {
        if (req.body.otp) {
            Driver.authenticateOtp(req.body.otp, function (error, driver) {
                if (error || !driver) {
                    res.json({
                        "status": 404,
                        "message": "record not found",
                        err: error
                    });


                } else {
                    driver.token = undefined;
                    driver.tokenExpires = undefined;
                    driver.save()
                    res.json({
                        "status": 200,
                        "message": "record found",
                        data: driver
                    });

                }
            });
        }
    });



    app.post('/login/driver', function (req, res, next) {
        if (req.body.phone && req.body.password) {
            Driver.authenticate(req.body.phone, req.body.password, function (error, driver) {
                if (error || !driver) {
                    res.json({
                        status: 404,
                        message: "Please check the provided data and try again",
                        err: error
                    });
                    return next(error);

                } else {
                    req.session.driverId = driver._id;
                    res.json({
                        status: 200,
                        message: "Hi Driver, you can start viewing and accepting Loads",
                        phone:driver.phone,
                        firstName:driver.firstName,
                        lastName:driver.lastName,
                        email:driver.email,
                        address:driver.address,
			            trackingUrl:driver.trackingUrl
                    });

                }
            });
        }
    });

    app.get('/finddriver/:phone', (req, res)=>{
        
        // console.log(req.params.phone)
        return Driver.find({phone:req.params.phone},[])
            .then(doc =>{
                // console.log(doc)
                return res.status(200).json({status:200, message:"Driver's details below", doc:doc})
            })
            
            .catch(err=>{
                return res.status(400).json(err)
            })
    })

    app.post('/deleteDriver', (req, res)=>{
        return Driver.findOneAndRemove({phone:req.body.phone})
            .then(doc =>{
                return res.status(200).json({status:200, message:"Driver's account successfully deleted"})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    })

    app.post('/editDriver', (req, res)=>{

        return Driver.findOneAndUpdate({phone:req.body.phone}, req.body
            )
            .then(doc=>{
                return res.status(200).json({status:200, message:"Drivers account successfully updated"})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    });

    app.post("/driver/account/forgot", function (req, res) {
        
                // See if the driver exist
                var driver = Driver.findOne({ phone: req.body.phone }, function (error, driver) {
                    if (driver) {
                        driver.resetPasswordToken = crypto.randomBytes(2).toString('hex');
                        driver.resetPasswordExpires = Date.now() + 3000000; // 5 minutes
                        driver.save();
                        var accountSid = 'AC7afc81c8e3a18610731ec557db201e5c';
                        var authToken = '2c0eb9fffa7ff12153fdcfe1aaa9c124';
        
                        //require the Twilio module and create a REST client 
                        var client = require('twilio')(accountSid, authToken);
        
                        client.messages.create({
                            to: "+234" + req.body.phone,
                            from: "+14243528976",
                            body: "Your OTP is " + driver.resetPasswordToken,
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
            app.post('/driver/otplogin', function (req, res, next) {
                if (req.body.resetPasswordToken) {
                    Driver.authenticateWithOtp(req.body.resetPasswordToken, function (error, driver) {
                        if (error || !driver) {
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

            
            app.post('/driver/account/reset', function (req, res, error) {
                if (req.body.password !== req.body.confirmPassword) {
                    return res.json({
                        status: 404,
                        message: "Password does not match"
                    });
        
                };
                var driver = Driver.findOne({
                    resetPasswordToken: req.body.resetPasswordToken,
                    resetPasswordExpires: { $gt: Date.now() }
        
                }, function (err, driver) {
        
                    if (!driver) {
                        return res.json({
                            status: 401,
                            message: "Password reset token is invalid or has expired"
                        });
                    }
                    bcrypt.hash({ password: req.body.password }, 10, function (err, hash) {
                        if (err) {
                            console.log(err);
                        }
                        driver.password = hash;
                        driver.password = req.body.password;
                        driver.resetPasswordToken = undefined;
                        driver.resetPasswordExpires = undefined;
                        driver.save()
        
                        return res.json({
                            status: 200,
                            message: "You have succesfully reset your password"
                        });
                    })
                })
        
            });


    app.get('/all-driver', function (req, res) {
        Driver.find({}, function (err, data){
            if(err){
                res.json({status:400,message:"please try again"})
            }
            else if(!data.length){
                res.json({status:201,
                message: "Unfortunately there isn't any Shipper at the moment, please try again later"
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
        }


module.exports.route = route;
