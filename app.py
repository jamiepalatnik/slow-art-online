import requests
import sys

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():

    # Get data from the Met API
    url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/437869"
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.HTTPError:
        print("Could not complete request.")
        sys.exit(1)

    content = response.json()
    img = content["primaryImage"]
    return render_template("index.html", img=img)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/reading-room")
def reading_room():
    return render_template("reading-room.html")

if __name__ == "__main__":
    app.run(debug=True)