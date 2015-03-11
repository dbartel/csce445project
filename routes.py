from flask import Flask, render_template, request, abort, g
from config import app
from controllers import *
import sqlite3


# Connect db before request
@app.before_request
def before_request():
	g.db = sqlite3.connect(app.config['DATABASE'])


#Close connection after request
@app.teardown_request
def teardown_request(exception):
	db = getattr(g, "db", None)
	if db is not None:
		db.close()

def get_response(request, ctrl):
	if request.method == "GET":
		return ctrl.get()
	elif request.method == "POST":
		return ctrl.post()
	elif request.method == "PUT":
		return ctrl.put()
	elif request.method == "DELETE":
		return ctrl.delete()
	else: abort(405)


#Home page 
@app.route("/")
def index():
	return render_template("index.html")


# API Routes

@app.route("/users", methods=["GET", "POST"])
def user_response():
	return get_response(request,users)