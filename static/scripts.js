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

// // Set the width of the side panel to 325px
// function openPanel() {
//     document.getElementById("side-panel").style.width = "325px";
//   }
  
// // Set the width of the side panel to 0
//   function closePanel() {
//     document.getElementById("side-panel").style.width = "0";
//   }

// Set the width of the side navigation to 325px and the right margin of the page content to 250px
function openPanel() {
    document.getElementById("side-panel").style.width = "325px";
    document.getElementById("main").style.marginRight = "325px";
  }
  
// Set the width of the side navigation to 0 and the right margin of the page content to 0
  function closePanel() {
    document.getElementById("side-panel").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }