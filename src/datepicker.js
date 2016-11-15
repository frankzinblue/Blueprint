(function () {

    var button = document.getElementById("mybutton");
    var testDisplay = document.getElementById("testDisplay");
    var timer;
    var endDate;
    var targetDisplayId;

    button.addEventListener("click", function() {
        var testInput = document.getElementById('testInput').value;
        startFunction(testInput, 'countdown')
    });

    function startFunction (endDateInput, id) {
        endDate = new Date(endDateInput);
        targetDisplayId = id;
        stopFunction();
        timer = setInterval(function () {
            showRemaining()
        }, 1000);
    }

    function stopFunction () {
        clearInterval(timer);
    }

    function showRemaining () {
        var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        var now = new Date();
        var distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(targetDisplayId).innerHTML = 'Expired!';
            return;
        }

        var days = Math.floor(distance / day);
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        document.getElementById(targetDisplayId).innerHTML = days + 'days ';
        document.getElementById(targetDisplayId).innerHTML += hours + 'hrs ';
        document.getElementById(targetDisplayId).innerHTML += minutes + 'mins ';
        document.getElementById(targetDisplayId).innerHTML += seconds + 'secs ';
    }

})();
