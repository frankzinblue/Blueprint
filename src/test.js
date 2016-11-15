var button = document.getElementById("mybutton");
var testDisplay = document.getElementById("testDisplay");
var timer;
var endDate;
var displayId;

button.addEventListener("click", function() {
    var testInput = document.getElementById('testInput').value;
    startFunction(testInput, 'countdown')
});

function startFunction (dt, id) {
    endDate = new Date(dt);
    displayId = id;
    stopFunction();
    timer = setInterval(function () {
        showRemaining()
    }, 1000);
}

function stopFunction () {
    clearInterval(timer);
}

function showRemaining () {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var now = new Date();
    var distance = endDate - now;
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById(displayId).innerHTML = 'Expired!';
        return;
    }

    var days = Math.floor(distance / day);
    var hours = Math.floor((distance % day) / hour);
    var minutes = Math.floor((distance % hour) / minute);
    var seconds = Math.floor((distance % minute) / second);

    document.getElementById(displayId).innerHTML = days + 'days ';
    document.getElementById(displayId).innerHTML += hours + 'hrs ';
    document.getElementById(displayId).innerHTML += minutes + 'mins ';
    document.getElementById(displayId).innerHTML += seconds + 'secs ';
}
