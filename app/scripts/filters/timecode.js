(function(){
    function timecode(){
        return function(seconds){           
            if (seconds === null || isNaN(seconds)){
                return "-:--";
            }
            var seconds = Number.parseFloat(seconds);
            var minutes = Math.floor(seconds / 60);
            var remainder = (seconds % 60).toFixed(0);
            var output = minutes + ":"
            if (remainder < 10){
                output += '0';
            }
            return output + remainder;        
        };
    }
    
    angular 
        .module('blocJams')
        .filter('timecode', timecode);
})();