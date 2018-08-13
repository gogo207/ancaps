global.db = require('./libs/db/db.js')();

var express           = require("express"),
    methodOverride    = require("method-override"),
    compress          = require("compression"),
    bodyParser        = require("body-parser"),
    User              = require('./model/user/user-db.js'),
    Driver            = require('./model/userDriver/userDriver-db.js'),
    truckOwner        = require('./model/truckOwner/truckOwner-db.js'),
    booking           = require('./model/booking/booking.js')
    cookieParser      = require("cookie-parser"),
    logger            = require("morgan"),
    mongoose          = require("mongoose"),
    cors              =require('cors');
      
    
    // bcrypt            = require('bcrypt')


var app = express();


app.get("/", function (req, res) {
    res.json({status:200,info:"welcome to home of trucking"})
})


// const MongoClient = require('mongodb').MongoClient 

// MongoClient.connect('mongodb://bobby:123456@ds117848.mlab.com:17848/ancat', (err) => {
//     if (err) {
//         console.log('Could NOT connect to database: ', err);
//     } else {
//         console.log('Connected to database');
//     }
// });


// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://bobby:123456@ds117848.mlab.com:17848/ancat';
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var router = require('./controllers/router.js');
app.enabled('trust proxy');

//  Use all the following middlewares before calling the home page.
app.use(logger('dev'));
app.use(compress());
app.use(cors());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: "Guy",
    resave: false,
    saveUninitialized: false
}));



// app.set('view engine', 'ejs');
// app.set('views','views');

var port = process.env.PORT || 3003;
// var ip = process.env.IP || '0.0.0.0';
app.listen(port);


 

// This allows you use the route funtions in the controller by exporting express to the route files using app.
router.route(app);
console.log("server started at " + port);




