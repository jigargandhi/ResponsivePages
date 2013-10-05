var data = [];
function populateData() {
    for (var i = 0; i < 10000; i++) { data.push(Math.random() * 1000000) }
}

$(function () {

    populateData();

    //bind events
    $("#btnSort").click(performSort);
    $("#btnChangeBGColor").click(changeBackgroundColor);

});

var sortedData = [];


function changeBackgroundColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    $("body").css("background-color", color);
    log("Color changed on " + (new Date()));
}


function log(msg) {
    $("#logContainer").append(msg + "<br />");
}