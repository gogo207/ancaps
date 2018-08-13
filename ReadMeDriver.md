======================================================================
DRIVER SIGNUP
======================================================================
Method: POST

navigate to url:

https://ancapbooking.herokuapp.com/register/driver

Field entry format

{
  "trackingUrl":""	//required field from google location share app***Please try and pass the link from the app
  "phone":"",		//required and most be unique
  "firstName":"",	//required
  "lastName":"",	//required
  "email": "",		//required and most be unique
  "password": "",	//required 
  "address": "",	//required and most be unique
  "DrivLicNo": "", 	//required and most be unique
}

If success recieve:
---------------------------------------------------------------------
status: 200,
message: "welcome to ancaps"
data: data


Example of success
{
    "status": 200,
    "message": "bobb baba",
    }
}
If failed recieve:
---------------------------------------------------------------------
status: 400,
message: "Sorry your registration has failed",
err: err


=====================================================================
LOGIN:
=====================================================================
Method: POST
Navigate to url:
https://ancapbooking.herokuapp.com/login/driver

Field entry format:
{
"phone": "",		//Required
"password":""		//Required

}

if success recieve:
---------------------------------------------------------------------
status: 200,
message: "record found"

if failed recieve:
---------------------------------------------------------------------
status: 404, 
message: "record not found",
err: err

=====================================================================
DRIVER SIGNUP OTP:
=====================================================================
Method: PUT
Navigate to url
https://ancapbooking.herokuapp.com/driver/logintoken

{
	otp:"" 		//Reqired
}			//User will recieve to to phone which user will use to validate account
			//The recieved token expires after 5min
If success Recieve:
---------------------------------------------------------------------
Status: 200,
Message:"Record found"
data:user

If Failed recieve:
status: 404
Message: "Record not found"
=====================================================================
DRIVER FORGOT PASSWORD:
=====================================================================
Method: PUT
Navigate to url
https://ancapbooking.herokuapp.com/driver/account/forgot

Fields:
{
	phone:""	please send this field to the backend
}
If success recieve:
---------------------------------------------------------------------
Status: 200
otpMessage: "A password reset has been sent to your phone"


=====================================================================
DRIVER LOAD FLOW
=====================================================================

View available loads
---------------------------------------------------------------------
Method: GET
Navigate to url:
https://ancapbooking.herokuapp.com/available-load
	//This will return all booked loads for driver to view

--------------------------------------------------------------------
If successful recieve:
Status:200,
Message: "view the available list below"
data: data
--------------------------------------------------------------------
If successful but no available load recieve:
Status:200,
Message: "Unfortunately there isn't any load at the moment, please try again later"
data: data
--------------------------------------------------------------------
If Failed recieve:
Status:400,
Message: "please try again"
err:err
=====================================================================


Accepting Load
---------------------------------------------------------------------
Method: POST
Navigate to url
https://ancapbooking.herokuapp.com/driver/accepted

Required fields
{
	item_id:""	//Please send this field to the backend
	driverPhone:""	//Please pass from save session
	trackingUrl:""	//please pass from drivers session
}
--------------------------------------------------------------------
If successful recieve:
Status:200,
Message: "Job Successfully accepted"
data: data
--------------------------------------------------------------------
If Failed recieve:
Status:400,
Message: "Failed to accept job"
err:err

====================================================================


Delivered Load
--------------------------------------------------------------------
Method: POST
Navigate to url
https://ancapbooking.herokuapp.com/driver/delivered

Required fields
{
	item_id:""	//Please send this field to the backend
}
-------------------------------------------------------------------
If successful recieve:
Status:200,
Message: "Job successfully delivered"
data: data
-------------------------------------------------------------------
If Failed recieve:
Status:400,
Message: "Failed to mark as delivered"


