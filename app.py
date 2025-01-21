from flask import Flask
app = Flask(__name__)

@app.route("/")
def main():
    print("Welcome to Slow Art Online!")


if __name__ == "__main__":
    main()