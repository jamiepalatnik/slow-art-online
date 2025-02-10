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