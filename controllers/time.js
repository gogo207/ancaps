function time()
{
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        var prepand = (hour >= 12)? " PM ":" AM ";

            hour = (hour >= 12)? hour - 12: hour;
            if(hour===0 && prepand===' PM '){ 
                
                if (minute===0 && second===0){ 
                    hour=12;
                    prepand=' Noon';
                } 
                else{ 
                    hour=12;
                    prepand=' PM';
                } 
            } 
            if (hour===0 && prepand===' AM '){ 
                
                if (minute===0 && second===0){ 
                    hour=12;
                    prepand=' Midnight';
                } 
                else{ 
                    hour=12;
                    prepand=' AM';
                } 
            } 
        return (hour + ":" + minute + ":" + second + prepand);
}
var now = time();
module.exports = now;