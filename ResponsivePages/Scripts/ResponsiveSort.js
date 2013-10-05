function SortData(iTurn) {
    var len = data.length;
    for (var i = 0; i < len; i++) {
        // setImmediate deprioritizes the argument function
        
        setImmediate((function (i) {
            
            for (var j = 0; j < len; j++) {

                if (data[i] > data[j]) {
                    var temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
            if (i === len - 1 && iTurn == 4) {
                log("Sorting completed on " + (new Date()));
            }
            
        }), i);
        
    }
    
}




function performSort(oDisplayElem) {
    var start = new Date();
    log("Sorting started on " + start);
    for (var i = 0; i < 5; i++) {
         SortData(i);  
    }
}
