import requests

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/437869"
    artwork = requests.get(url)
    artwork_data = artwork.json()
    img = artwork_data["primaryImage"]
    return render_template("index.html", img=img)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/reading-room")
def reading_room():
    return render_template("reading-room.html")

if __name__ == "__main__":
    app.run(debug=True)