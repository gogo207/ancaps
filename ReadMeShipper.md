PLEASE USE AS DOCUMENTED

For login please you "phone" and "password"


=======================================================================
SHIPPER REGISTER/SIGNUP:
=======================================================================
Method: POST

navigate to url:

https://ancapbooking.herokuapp.com/register/shipper

Field entry format

{
  "phone":"",		//required and most be unique
  "firstName":"",	//required
  "lastName":"",	//required
  "email": "",		//required and most be unique
  "password": "",	//required and most be unique
  "address": "",	//required and most be unique
  "IDType": "", 	//required
  "IDNum": ""		//required and most be unique

}

If success recieve:
-----------------------------------------------------------------------
status: 200,
message: "welcome to ancaps shipper"
data: data


Example of success
{
    "status": 200,
    "message": "bobb baba",
    }
}
If failed recieve:
------------------------------------------
status: 400,
message: "Registration Failed",
err: err

=======================================================================
LOGIN:
=======================================================================
Method: POST
Navigate to url:
https://ancapbooking.herokuapp.com/login/shipper

Field entry format:
{
"phone": "",		//Required
"password":""		//Required

}

if success recieve:
-----------------------------------------------------------------------
status: 200,
message: "Hi Shipper, you can start you load booking now"

if failed recieve:
-----------------------------------------------------------------------
status: 404, 
message: "Please check the provided data and try again",
err: err

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Shipper work flow
=======================================================================
BOOKING:
=======================================================================
Method: POST
Navigate to url;
https://ancapbooking.herokuapp.com/shipper/booking

Fields format:
{
phone:""		//Required
itemsType:""		//Required
itemsWeight: ""		//Required
locationFrom: ""	//Required
locationTo: ""		//Required

}

If failed
-----------------------------------------------------------------------
status: 400
message: "Booking failed"
err: err

If success recieve:
-----------------------------------------------------------------------
status: 200
message: "Booking completed"
data: data
-----------------------------------------------------------------------

=======================================================================
PAYMANT
=======================================================================
Method: POST
Navigate to url;
https://ancapbooking.herokuapp.com/shipper/payment

Fields format:
{
	paymentFor: "",		//Required
        AccountName: "",	//Required
        Amount:"",		//Required
        email:""		//Required


}

if failed recieve
-----------------------------------------------------------------------
status: 404, 
message: "Payment failed"
err: err 

if success recieve
-----------------------------------------------------------------------
status: 200,
message: "Payment completed"
data: data
-----------------------------------------------------------------------

=======================================================================
Completed Job
-----------------------------------------------------------------------
Method: POST
Navigate to url
https://ancapbooking.herokuapp.com/shipper/completed

Required fields
{
	item_id:""	//Please send this field to the backend
}
-----------------------------------------------------------------------
If successful recieve:
Status:200,
Message: "Job successfully completed"
data: data
-----------------------------------------------------------------------
If Failed recieve:
Status:400,
Message: "Failed to mark as completed"
err:err

