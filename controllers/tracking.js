var mongoose = require('mongoose');

function route(app) {
    db = mongojs('mongodb://bobby:123456@ds259768.mlab.com:59768/ancapnew',['accepteds']);

    app.post('/shipper/tracking', function (req, res) {

        var item_id = req.body.item_id
        var id = mongojs.ObjectId(item_id);

        db.accepteds.find({_id:id}, function (err, data){
            if(err){
                res.json({
                    status:400,
                    message:"please try again"
                })
            }
  

            else{
                res.json({
                    status: 200,
                    messsage:"tracking loading",
                    data: data
		    });
            }
        })
    })
}

module.exports.route = route;
