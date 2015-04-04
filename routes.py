from flask import Flask, render_template, request, abort, g, redirect, session, url_for
from flask.ext.github import GitHub

#import flask
from config import app
from controllers import *
import sqlite3
import json

# Connect db before request

#@app.before_request
#def before_request():
#	g.db = sqlite3.connect(app.config['DATABASE'])

github = GitHub(app)



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


# Github access token getter
@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user

@app.before_request
def before_request():
    g.user = None
    print ">>>>> checking id"
    if "user_id" in session:
        print ">>>>> session user"
        g.user = session["user_id"]

#Home page 
@app.route("/", methods = ['GET', 'POST'])
def index():
    print 'running initial route'
    return render_template("landing.html")

#these routes never run
@app.route('/landing', methods = ['GET', 'POST'])
def landing():
    return str(github.get("user"))


@app.route('/dashboard', methods = ['GET', 'POST'])
@github.authorized_handler
def dashboardFunc(access_token):
    if access_token is None:
        return redirect(url_for("index"))
    session["user_id"] = access_token

    return redirect(url_for("landing"))


@app.route("/login")
def login():
    if session.get("user_id", None) is None:
        return github.authorize()
    else:
        return "Already logged in!"


@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect(url_for(""))




@app.route('/planning', methods = ['POST', 'GET'])
def planningFunc():
    pass
@app.route('/project', methods = ['POST'])
def projectFunc():
    print 'running project route'
    pass

@app.route('/retrospective', methods = ['POST'])
def retrospectiveFunc():
    print 'check'
    pass

@app.route('/sprint', methods = ['POST'])
def sprintFunc():
    print 'check'
    pass




# API Routes

@app.route("/users", methods=["GET", "POST"])
def user_response():
	return get_response(request,users)
