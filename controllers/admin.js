
var admin = require("../model/admin/admin-db.js");
bcrypt = require('bcryptjs');
crypto = require('crypto');
mongoose = require('mongoose');


function route(app) {
    app.post("/register/admin", function (req, res) {
        var form = {
            password: req.body.password,
            username: req.body.username

        }

        admin.create(form, function (err, data) {
            if (err) {
                res.json({
                    status: 400,
                    message: "Could not create user",
                    err: err
                });
            } else {
                res.json({
                    status: 200,
                    message: "Admin created",
                    data: data
                });
            }
        });
    });

    //=============================================================================================
    // Stunts
    //=============================================================================================

    app.get("/register/admin", function (req, res) {
        admin.find({}, function (err, data) {
            if (err) {
                console.log("error!")
                res.json({
                    status: 404,
                    message: "Infomation not found",
                    err: err
                });
            } else {
                res.json({
                    status: 200,
                    message: "welcome to ancaps shipper",
                    data: data
                });
            }
        })
    })


    app.post('/login/admin', function (req, res, next) {
        if (req.body.username && req.body.password) {
            admin.authenticate(req.body.username, req.body.password, function (error, user) {
                var user = this;
                if (error || !user) {
                    res.json({
                        status: 404,
                        message: "Please check the provided data and try again",
                        err: error,
                    });
                    return next(error);

                } else {
                    req.session.userId = user._id;
                    res.json({
                        status: 200,
                        message: "Hi admin",

                    });

                }
            });
        }
    });

    app.post('/admin/account/reset', function (req, res, error) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.json({
                status: 404,
                message: "Password does not match"
            });

        };
        var user = admin.findOne({
            username: req.body.username,

        }, function (err, user) {

            if (!user) {
                return res.json({
                    status: 401,
                    message: "Password reset is invalid "
                });
            }
            bcrypt.hash({ password: req.body.password }, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                user.password = hash;
                user.password = req.body.password;
                user.save()

                return res.json({
                    status: 200,
                    message: "You have succesfully reset your password"
                });
            })
        })

    });

    // DELETE ROUTE
    var Driver = require("../model/userDriver/userDriver-db.js");
    app.delete("/delete/driver", function (req, res) {
        Driver.findOne({phone: req.body.phone}, function (err) {
            if (err) {
                res.json({
                    status: 404,
                    message: "Infomation not found",
                    err: err
                })
            } else {
                res.json({
                    status: 200,
                    message: "Driver deleted",

                });
            }
        })
    })
}


module.exports.route = route;