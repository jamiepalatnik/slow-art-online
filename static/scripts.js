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