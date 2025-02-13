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

// TODO: Timer

// Define timer function and variables
const timerButton = document.getElementById('timerButton');
let timerState = "stopped";

// Set the timer to 5 minutes (1 minute for testing)
let minutes = 5;
let duration = minutes * 60 * 1000; // Duration in milliseconds
let startTime = Date.now();
let endTime = startTime + duration;
let pausedTime;

// Define timer countdown function
function updateTimer() {

    let currentTime = Date.now();
    let remainingTime = endTime - currentTime;
    let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Add 0 to seconds display when there are less than 10 seconds remaining
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    if (remainingTime <= 0) {
        timerState = "stopped";
        document.getElementById("timerDisplay").innerHTML = "Done";
        return;
    }

    // Update button text and display the remaining time
    document.getElementById("timerDisplay").innerHTML = remainingMinutes + ":" + remainingSeconds;

    // Update timer button text depending on timer state
    if (timerState === "running") {
        requestAnimationFrame(updateTimer);
        document.getElementById("timerButtonText").innerHTML = "Pause timer";
    } else if (timerState === "stopped" || timerState === "paused") {
        document.getElementById("timerButtonText").innerHTML = "Start timer";
    }
}

// When timer button is clicked, update timer state depending on current timer state
timerButton.onclick = function() {
    if (timerState === "stopped" || timerState === "paused") {
        timerState = "running";
        requestAnimationFrame(updateTimer);
    } else if (timerState === "running") {
        timerState = "paused";
        // TODO Store elapsed time in a variable so when the timer restarts it can restart where it left off
    }
}