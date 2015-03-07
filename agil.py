from flask import Flask, render_template

app = Flask(__name__)

# Enable debug mode
app.debug = True

@app.route("/")
def index():
	return render_template("index.html")

if __name__ == "__main__":
	app.run()