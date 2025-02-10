// Get random image from Python route
document.getElementById('getRandomButton').addEventListener('click', function() {
    fetch('/random_image')
        .then(response => response.json())
        .then(data => {
            // Update image source and details
            document.getElementById('artImage').src = data.image_url;
        });
});