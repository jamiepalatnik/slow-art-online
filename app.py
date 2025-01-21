import requests

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/437869"
    artwork = requests.get(url)
    image_data = artwork.json()
    img = image_data["primaryImage"]
    return render_template("index.html", img=img)

if __name__ == "__main__":
    main()