Price api DOCUMENTATION
===============================================
Method: POST
Navigate to url
https://ancapbooking.herokuapp.com/dist

Fields format:
{
	origin: "",
	destination: ""
}

If success recieve:
-------------------------------------------------
Status: 200
distance: distance
price: totalPricing

If failed recieve
Status: 400
message: "calculation failed'
err:err
