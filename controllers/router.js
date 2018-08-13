function route(app){
    
var user  = require("./user");
var userDriver = require("./userDriver")
var admin  = require("./admin");
var truckOwner  = require("./truckOwner");
var booking = require("./booking");
var paymentHistory = require("./paymentHistory");
var filter = require("./filter");
var price = require("./price");
var accepted = require("./accepted");
var acceptedHistory = require("./acceptedHistory");
var deliveredHistory = require("./deliveredHistory");
var completedHistory = require("./completedHistory");
var delivered = require("./delivered");
var completed = require('./completed');
var tracking  = require("./tracking");

user.route(app);
userDriver.route(app);
admin.route(app);
truckOwner.route(app);
booking.route(app);
paymentHistory.route(app);
filter.route(app);
price.route(app);
accepted.route(app);
acceptedHistory.route(app);
delivered.route(app);
deliveredHistory.route(app);
completed.route(app);
completedHistory.route(app);
tracking.route(app);

}

module.exports.route = route;
