import os
import random
import requests
import sys


from flask import Flask, render_template

app = Flask(__name__)

# Return the object record for a random object from a given list of objects
def select_random_object(objectIDs):

    # Select random object ID from list
    random_objectID = str(random.choice(objectIDs))

    # Create object endpoint URL for random object ID
    url = (
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
        + random_objectID
    )

    # API call for random object
    try:
        object_response = requests.get(url)
        object_response.raise_for_status()
    except requests.HTTPError:
        print("Could not complete request.")
        sys.exit(1)

    object_content = object_response.json()

    return object_content

@app.route("/")
def main():
    object_content = get_random_object()
    random_image = object_content["primaryImage"]
    title = object_content["title"]
    artist_display_name = object_content["artistDisplayName"]
    return render_template("index.html", random_image=random_image, title=title, artist_display_name=artist_display_name, page_class="homepage")

# Get object record for random object from the Met API
@app.route("/random-image")
def get_random_object():
    # Get data for object IDs from the American Wing that are paintings
    try:
        response = requests.get(
            "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=1&q=painting"
        )
        response.raise_for_status()
    except requests.HTTPError:
        print("Couldn't complete request!")
        sys.exit(1)

    content = response.json()

    # Get list of object IDs from JSON
    objectIDs = content["objectIDs"]

    # Pass list of objectIDs to select_random_object function
    object_content = select_random_object(objectIDs)

    # # Blank image for testing
    # object_response = requests.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/17120")
    # object_content = object_response.json()

    # Get primary image from object record if it exists, or select new object
    while True:
        try:
            random_image = object_content["primaryImage"]
            # Select new random object if there is no primary image
            if random_image == "": 
                raise ValueError
            else:
                break
        except ValueError:
            object_content = select_random_object(objectIDs)

    return object_content


@app.route("/about")
def about():
    return render_template("about.html", page_class="about")


@app.route("/reading-room")
def reading_room():
    return render_template("reading-room.html", page_class="reading-room")


if __name__ == "__main__":
    # Don't launch server when running app with test flag
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        main()
    else: 
        port = int(os.environ.get("PORT", 8080))
        app.run(host="0.0.0.0", port=port, debug=True)
