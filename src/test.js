var button = document.getElementById("mybutton");
var testDisplay = document.getElementById("testDisplay");

button.addEventListener("click", function() {
    var testInput = document.getElementById('testInput').value;
    // testDisplay.innerHTML = testInput;
    countDownTimer(testInput, 'countdown')
});

function countDownTimer (dt, id) {
    var end = new Date(dt);
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var timer;

    function showRemaining () {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(id).innerHTML = 'Expired!';
            return;
        }

        var days = Math.floor(distance / day);
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        document.getElementById(id).innerHTML = days + 'days ';
        document.getElementById(id).innerHTML += hours + 'hrs ';
        document.getElementById(id).innerHTML += minutes + 'mins ';
        document.getElementById(id).innerHTML += seconds + 'secs ';
    }

    timer = setInterval(showRemaining, 1000);
}
