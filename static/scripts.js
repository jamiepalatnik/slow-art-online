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

// Set the width of the side panel to 400px
function openPanel() {
    document.getElementById("side-panel").style.width = "325px";
  }
  
// Set the width of the side panel to 0
  function closePanel() {
    document.getElementById("side-panel").style.width = "0";
  }