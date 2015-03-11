from flask import Flask, render_template, request
from agil import app
from controllers import *

#Home page 
@app.route("/")
def index():
	return render_template("index.html")


# API Routes

@app.route("/users", methods=["GET", "POST"])
def usersResponse():
	if request.method == "GET":
		return users.get()
	else:
		return "bad"