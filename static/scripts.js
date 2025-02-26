// Get random image from Python route
const getRandomButton = document.getElementById('getRandomButton');

getRandomButton.onclick = function() {
    fetch('/random-image')
        .then(response => response.json())
        .then(data => {
            document.getElementById('random-image').src = data["primaryImage"];
            document.getElementById('objectTitle').innerHTML = data["title"];
            document.getElementById('artistDisplayName').innerHTML = data["artistDisplayName"];
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

// Timer

// Define timer function and variables
const timerButton = document.getElementById('timerButton');
const resetTimerButton = document.getElementById("resetTimerButton");
let running = false;

// Set the timer to 5 minutes
let minutes = 5;
let duration = minutes * 60 * 1000; // Duration in milliseconds
let endTime;
let pausedTime;

// Display total duration when clicked to make sure timer starts at the correct time
document.getElementById("timerDisplay").innerHTML = minutes + ":00";

// Define timer countdown function
function updateTimer() {
    let remainingTime = endTime - performance.now();
    let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Add 0 to seconds display when there are less than 10 seconds remaining
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    if (remainingTime <= 0) {
        running = false;
        document.getElementById("timerDisplay").innerHTML = "Done";
        duration = minutes * 60 * 1000; // Reset duration
        document.getElementById("timerButtonText").innerHTML = "Reset timer";
        return;
    }

    // Update button text and display the remaining time
    document.getElementById("timerDisplay").innerHTML = remainingMinutes + ":" + remainingSeconds;

    // Update timer button text depending on timer state
    if (running) {
        requestAnimationFrame(updateTimer);
        document.getElementById("timerButtonText").innerHTML = "Pause timer";
    } else if (!running) {
        document.getElementById("timerButtonText").innerHTML = "Start timer";
    }
}

// When timer button is clicked, update timer state depending on current timer state
timerButton.onclick = function() {
    if (running) {
        running = false;
        duration = endTime - performance.now(); 
    } else {
        running = true;
        endTime = performance.now() + duration;
        requestAnimationFrame(updateTimer);
    }
}

// When reset timer button is clicked, reset timer
resetTimerButton.onclick = function() {
        // Display total duration when clicked to make sure timer starts at the correct time
        document.getElementById("timerDisplay").innerHTML = minutes + ":00";
        // Update duration and endTime to starting values, with an extra second to allow the full time to display
        duration = (minutes * 60 * 1000) + 1000;
        endTime = performance.now() + duration;
    } 