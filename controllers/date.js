function today(){
    var today = new Date();
    var dd = today.getDate();
    var day = today.getDay();
    var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
           mm='0'+mm;
        } 
        today = mm+'/'+dd+'/'+yyyy;
        return ( daylist[day]+ " " +today); 
}
var date = today()

module.exports = date