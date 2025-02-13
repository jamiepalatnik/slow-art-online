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

// Define timer button
const timerButton = document.getElementById('timerButton');

timerButton.onclick = function() {

    // Set the timer to 5 minutes
    let minutes = 5;
    let duration = minutes * 60 * 1000; // Duration in milliseconds
    let startTime = Date.now();
    let endTime = startTime + duration;

    function updateTimer() {
        let currentTime = Date.now();
        let remainingTime = endTime - currentTime;
      
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          document.getElementById("timerDisplay").innerHTML = "Done";
          return;
        }
      
        let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Add 0 to seconds display when there are less than 10 seconds remaining
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds
        }
      
        // Display the remaining time
        document.getElementById("timerDisplay").innerHTML = remainingMinutes + ":" + remainingSeconds;
      }
      
      let timerInterval = setInterval(updateTimer, 1000);
} 