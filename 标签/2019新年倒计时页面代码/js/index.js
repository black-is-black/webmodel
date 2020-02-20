var targetTime = new Date("Jan 1, 2019");

var oneSecond = 1000;
var oneMinute = oneSecond * 60;
var oneHour = oneMinute * 60;
var oneDay = oneHour * 24;

var $daysEl = $(".time-el #days");
var $hoursEl = $(".time-el #hours");
var $minutesEl = $(".time-el #minutes");
var $secondsEl = $(".time-el #seconds");

function startCountDown() {
  updateTick();
  var timeInterval = setInterval(updateTick, oneSecond);

  function updateTick() {
    var timeLeft = Date.parse(targetTime) - Date.parse(new Date());
    var spanContent = "\n      <div class=\"digit\">\n         <div class=\"next\">\n        <span class=\"top\"><span class=\"inner\">$1</span></span>\n        <span class=\"bottom\"><span class=\"inner\">$1</span></span>\n          </div>\n         <div class=\"current\">\n        <span class=\"top\"><span class=\"inner\">$1</span></span>\n        <span class=\"bottom\"><span class=\"inner\">$1</span></span>\n          </div>\n      </div>";











    $daysEl.html(Math.floor(timeLeft / oneDay)).html(function (i, digit) {return digit.replace(/(\d)/g, spanContent);});
    $hoursEl.html(("0" + Math.floor(timeLeft % oneDay / oneHour)).slice(-2)).html(function (i, digit) {return digit.replace(/(\d)/g, spanContent);});
    $minutesEl.html(("0" + Math.floor(timeLeft % oneHour / oneMinute)).slice(-2)).html(function (i, digit) {return digit.replace(/(\d)/g, spanContent);});
    $secondsEl.html(("0" + Math.floor(timeLeft % oneMinute / oneSecond)).slice(-2)).html(function (i, digit) {return digit.replace(/(\d)/g, spanContent);});

    // let tl = new TimelineMax()
    //  .to('.current .top', 0.5, {rotationX: -90, ease: Power0.easeNone}, 0)
    //  .fromTo('.current .bottom', 0.5, {rotationX: 90}, {rotationX: 0, ease: Power0.easeNone}, 0.5);  

    if (timeLeft <= 0) clearInterval(timeInterval);
  }
}


function flip() {
  var timeLeft = Date.parse(targetTime) - Date.parse(new Date());
  var tl = TweenMax.to({}, 1, { repeat: -1, onRepeat: function onRepeat() {console.log(Date.parse(targetTime) - Date.parse(new Date()));} });
}

$(function () {
  startCountDown();
  // flip();
});