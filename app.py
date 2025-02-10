import requests
import sys
import random

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def main():
    # Get data from the Met API
    url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437869"
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.HTTPError:
        print("Could not complete request.")
        sys.exit(1)

    content = response.json()
    image = content["primaryImage"]

    return render_template("index.html", image=image)


# Get random image from the Met API
@app.route("/random-image")
def get_random_image():

    # Get a list of object IDs from the American Wing that are paintings
    try:
        response = requests.get(
            "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=1&q=painting"
        )
        response.raise_for_status()
    except requests.HTTPError:
        print("Couldn't complete request!")
        sys.exit(1)

    content = response.json()

    # Get list from JSON
    objectIDs = content["objectIDs"]
    print(objectIDs)

    # # Random selection from American Wing, not filtered
    # highlights = [
    #     701989,
    #     20517,
    #     11797,
    #     11130,
    #     11116,
    #     12828,
    #     14930,
    #     10813,
    #     10080,
    #     11981,
    #     13065,
    #     19261,
    #     11227,
    #     13171,
    #     16687,
    #     11050,
    #     12600,
    #     16584,
    #     10497,
    #     11605,
    #     11122,
    #     10482,
    #     11133,
    #     11145,
    #     13052,
    #     10388,
    #     12822,
    #     10159,
    #     11619,
    #     11734,
    #     14472,
    #     10819,
    #     694642,
    #     20888,
    #     20768,
    #     10557,
    #     11707,
    #     11396,
    #     11417,
    #     10786,
    #     10554,
    #     10186,
    #     19346,
    #     12127,
    #     11263,
    #     11269,
    #     11311,
    # ]

    # Generate object request using random object ID from list
    random_objectID = str(random.choice(objectIDs))
    print(f"Random object ID: {random_objectID}")

    url = (
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
        + random_objectID
    )
    print(f"Random object URL: {url}")

    try:
        objectResponse = requests.get(url)
        objectResponse.raise_for_status()
    except requests.HTTPError:
        print("Could not complete request.")
        sys.exit(1)

    objectContent = objectResponse.json()
    random_image = objectContent["primaryImage"]
    print(f"Random image: {random_image}")

    return random_image


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/reading-room")
def reading_room():
    return render_template("reading-room.html")


if __name__ == "__main__":
    # Don't launch server when running app with test flag
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        get_random_image()
    else: 
        app.run(debug=True)
