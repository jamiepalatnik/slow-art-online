// Get random image from Python route
const getRandomButton = document.getElementById('getRandomButton');

getRandomButton.onclick = function() {
    fetch('/random-image')
        .then(response => response.json())
        .then(data => {
            document.getElementById('random-image').src = data["primaryImage"];
        })
        .catch(error => console.error('Error fetching image:', error));

} 

// Open the side panel
function openPanel() {
    document.getElementById("side-panel").style.transform = "translateX(0%)";
    document.querySelector(".home").style.width = "calc(100% - 325px)";
  }
  
// Close the side panel
function closePanel() {
    document.getElementById("side-panel").style.transform = "translateX(100%)";
    document.querySelector(".home").style.width = "calc(100% - 0px)";
}

// Set the timer start and end time
var timerStart = new Date().getMinutes();
var timerEnd = new Date();
timerEnd.setMinutes(timerStart + 5); 

// Update the timer every second
var x = setInterval(function() {

  // Get current status
  var now = new Date().getTime();

  // Find the time between the start time and the end time
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);