var distance = require('google-distance-matrix');
 
//var origins = ['gindiri, ng'];
//var destinations = ['tudun wada jos, ng'];
 
distance.key('AIzaSyANzFN7WXJ8xB0Fmx2XZwl1DSYR3_pcNVg');
distance.units('metric');

function route(app){ 
	app.post('/dist', (req, res)=> {
		let origin = req.body.origin;
        let destination = req.body.destination;
        
        var origins =[];
        origins.push(origin);
        var destinations =[];
        destinations.push(destination);
		
	 
distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if(!distances) {
                return console.log('no distances');
            }
            if (distances.status == 'OK') {
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var distance = distances.rows[i].elements[j].distance.text;

                            console.log(distance);
                            var dist = distance.replace(/[^\d.-]/g, '');
                            console.log(dist);


//=======================================================================================================
                            var distance = dist;


                            var totalPricing;

                            if (distance > 0 && distance <= 20) {
                                totalPricing = 84661.92;
                            } else if (distance >= 21 && distance <= 40) {
                                totalPricing = 101607.36;
                            } else if (distance >= 41 && distance <= 60) {
                                totalPricing = 118552.32;
                            } else if (distance >= 61 && distance <= 80) {
                                totalPricing = 135497.76;
                            } else if (distance >= 81 && distance <= 100) {
                                totalPricing = 152442.72;
                            } else if (distance >= 101 && distance <= 120) {
                                totalPricing = 163457.28;
                            } else if (distance >= 121 && distance <= 140) {
                                totalPricing = 174471.36;
                            } else if (distance >= 141 && distance <= 160) {
                                totalPricing = 185485.92;
                            } else if (distance >= 161 && distance <= 180) {
                                totalPricing = 196500.48;
                            } else if (distance >= 181 && distance <= 200) {
                                totalPricing = 207514.56;
                            } else if (distance >= 201 && distance <= 220) {
                                totalPricing = 218529.1;
                            } else if (distance >= 221 && distance <= 240) {
                                totalPricing = 229543.2;
                            } else if (distance >= 241 && distance <= 260) {
                                totalPricing = 240557.76;
                            } else if (distance >= 261 && distance <= 280) {
                                totalPricing = 251572.32;
                            } else if (distance >= 281 && distance <= 300) {
                                totalPricing = 262586.4;
                            } else if (distance >= 301 && distance <= 320) {
                                totalPricing = 273600.96;
                            } else if (distance >= 321 && distance <= 340) {
                                totalPricing = 284615.04;
                            } else if (distance >= 341 && distance <= 360) {
                                totalPricing = 295629.6;
                            } else if (distance >= 361 && distance <= 380) {
                                totalPricing = 306644.16;
                            } else if (distance >= 381 && distance <= 400) {
                                totalPricing = 317658.24;
                            } else if (distance >= 401 && distance <= 420) {
                                totalPricing = 328672.8;
                            } else if (distance >= 421 && distance <= 440) {
                                totalPricing = 339686.88;
                            } else if (distance >= 441 && distance <= 460) {
                                totalPricing = 350701.44;
                            } else if (distance >= 461 && distance <= 480) {
                                totalPricing = 361716;
                            } else if (distance >= 481 && distance <= 500) {
                                totalPricing = 372730.08;
                            } else if (distance >= 501 && distance <= 520) {
                                totalPricing = 383744.64;
                            } else if (distance >= 521 && distance <= 540) {
                                totalPricing = 394758.72;
                            } else if (distance >= 541 && distance <= 560) {
                                totalPricing = 405773.28;
                            } else if (distance >= 561 && distance <= 580) {
                                totalPricing = 416787.84;
                            } else if (distance >= 581 && distance <= 600) {
                                totalPricing = 427801.92;
                            } else if (distance >= 601 && distance <= 620) {
                                totalPricing = 438816.48;
                            } else if (distance >= 621 && distance <= 640) {
                                totalPricing = 449830.56;
                            } else if (distance >= 641 && distance <= 660) {
                                totalPricing = 460845.12;
                            } else if (distance >= 661 && distance <= 680) {
                                totalPricing = 471859.68;
                            } else if (distance >= 681 && distance <= 700) {
                                totalPricing = 482873.76;
                            } else if (distance >= 701 && distance <= 720) {
                                totalPricing = 493888.32;
                            } else if (distance >= 721 && distance <= 740) {
                                totalPricing = 504902.4;
                            } else if (distance >= 741 && distance <= 760) {
                                totalPricing = 515916.96;
                            } else if (distance >= 761 && distance <= 780) {
                                totalPricing = 526931.52;
                            } else if (distance >= 781 && distance <= 800) {
                                totalPricing = 537945.6;
                            } else if (distance >= 801 && distance <= 820) {
                                totalPricing = 548960.16;
                            } else if (distance >= 821 && distance <= 840) {
                                totalPricing = 559974.24;
                            } else if (distance >= 841 && distance <= 860) {
                                totalPricing = 570988.8;
                            } else if (distance >= 861 && distance <= 880) {
                                totalPricing = 582003.36;
                            } else if (distance >= 881 && distance <= 900) {
                                totalPricing = 593017.44;
                            } else if (distance >= 901 && distance <= 920) {
                                totalPricing = 604032;
                            } else if (distance >= 921 && distance <= 940) {
                                totalPricing = 615046.08;
                            } else if (distance >= 941 && distance <= 960) {
                                totalPricing = 626060.64;
                            } else if (distance >= 961 && distance <= 980) {
                                totalPricing = 637075.2;
                            } else if (distance >= 981 && distance <= 100) {
                                totalPricing = 648089.2;
                            } else if (distance >= 1021 && distance <= 1040) {
                                totalPricing = 670117.92;
                            } else if (distance >= 1001 && distance <= 1020) {
                                totalPricing = 659103.84;
                            } else if (distance >= 1041 && distance <= 1060) {
                                totalPricing = 681132.48;
                            } else if (distance >= 1061 && distance <= 1080) {
                                totalPricing = 692147.04;
                            } else if (distance >= 1081 && distance <= 1100) {
                                totalPricing = 703161.12;
                            } else if (distance >= 1101 && distance <= 1120) {
                                totalPricing = 714175.68;
                            } else if (distance >= 1121 && distance <= 1140) {
                                totalPricing = 725190.24;
                            } else if (distance >= 1141 && distance <= 1160) {
                                totalPricing = 736204.32;
                            } else if (distance >= 1161 && distance <= 1180) {
                                totalPricing = 747218.88;
                            } else if (distance >= 1181 && distance <= 1200) {
                                totalPricing = 758232.96;
                            } else if (distance >= 1201 && distance <= 1220) {
                                totalPricing = 769247.52;
                            } else if (distance >= 1221 && distance <= 1240) {
                                totalPricing = 780262.08;
                            } else if (distance >= 1241 && distance <= 1260) {
                                totalPricing = 791276.16;
                            } else if (distance >= 1261 && distance <= 1280) {
                                totalPricing = 802290.72;
                            } else if (distance >= 1281 && distance <= 1300) {
                                totalPricing = 813304.8;
                            } else if (distance >= 1301 && distance <= 1320) {
                                totalPricing = 824319.36;
                            } else if (distance >= 1321 && distance <= 1340) {
                                totalPricing = 835333.92;
                            } else if (distance >= 1341 && distance <= 1360) {
                                totalPricing = 846348;
                            } else if (distance >= 1361 && distance <= 1380) {
                                totalPricing = 857362.56;
                            } else if (distance >= 1381 && distance <= 1400) {
                                totalPricing = 868376.64;
                            } else if (distance >= 1401 && distance <= 1420) {
                                totalPricing = 879391.2;
                            } else if (distance >= 1421 && distance <= 1440) {
                                totalPricing = 890405.76;
                            } else if (distance >= 1441 && distance <= 1460) {
                                totalPricing = 901419.84;
                            } else if (distance >= 1461 && distance <= 1480) {
                                totalPricing = 912434.4;
                            } else if (distance >= 1481 && distance <= 1500) {
                                totalPricing = 923448.48;
                            } else if (distance >= 1501 && distance <= 1520) {
                                totalPricing = 934463.04;
                            } else if (distance >= 1521 && distance <= 1540) {
                                totalPricing = 945477.6;
                            } else if (distance >= 1541 && distance <= 1560) {
                                totalPricing = 956491.68;
                            } else if (distance >= 1561 && distance <= 1580) {
                                totalPricing = 967506.24;
                            } else if (distance >= 1581 && distance <= 1600) {
                                totalPricing = 978520.32;
                            } else if (distance >= 1601 && distance <= 1620) {
                                totalPricing = 989534.88;
                            } else if (distance >= 1621 && distance <= 1640) {
                                totalPricing = 1000549.44;
                            } else if (distance >= 1641 && distance <= 1660) {
                                totalPricing = 1011563.52;
                            } else if (distance >= 1661 && distance <= 1680) {
                                totalPricing = 1022578.08;
                            } else if (distance >= 1681 && distance <= 1700) {
                                totalPricing = 1033592.16;
                            } else if (distance >= 1701 && distance <= 1720) {
                                totalPricing = 1044606.72;
                            } else if (distance >= 1721 && distance <= 1740) {
                                totalPricing = 1055621.28;
                            } else if (distance >= 1742 && distance <= 1760) {
                                totalPricing = 1066635.36;
                            } else if (distance >= 1761 && distance <= 1780) {
                                totalPricing = 1077649.92;
                            } else if (distance >= 1781 && distance <= 1800) {
                                totalPricing = 1088664;
                            }

                            console.log(totalPricing);

                    //=======================================================================================================
                                                // return(dist);
                                                // console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                                            } else {
                                                //console.log(distance);
                                            }
                                        }
                                        // console.log(distance*2)
                                    }
                                }
                                // console.log(distance*2)
                                //return distance;
                                
                        //=================================================================================================

                        //=================================================================================================
                    if(err)
                    res.json({
                            status: 400,
                            message:"calculation failed",
                            err: err
                    });
                    res.json({
                            status: 200,
                            distance:distance,
                            price:totalPricing
                        });
                    })
})
    

}
module.exports.route = route;