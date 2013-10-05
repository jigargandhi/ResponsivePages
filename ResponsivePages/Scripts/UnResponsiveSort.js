function SortData() {
    // data is a global variable;
    var iLen = data.length;
    //Outer for loop
    for (var itrI = 0; itrI < iLen; itrI++) {

        //Inner for loop
        for (var itrJ = 0; itrJ < iLen; itrJ++) {

            //Comparison and swap
            if (data[itrI] > data[itrJ]) {
                var temp = data[itrI];
                data[itrI] = data[itrJ];
                data[itrJ] = temp;
            }
        }
        
    }
}


function performSort(oDisplayElem) {
    var start = new Date();
    log("Sorting started on " + start);
    for (var i = 0; i < 50; i++) {
        sortedData = SortData();
    }
    log("Sorting completed on " + (new Date()));
}
