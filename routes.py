from flask import Flask, render_template, request, abort, g, redirect, session, url_for
from flask.ext.github import GitHub

#import flask
from config import app
from controllers import *
import json

# Initialize flask-github
github = GitHub(app)




###########################
## Auth through github

# Github access token getter
@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user

@app.before_request
def before_request():
    g.user = None
    if "user_id" in session:
        g.user = session["user_id"]

@app.route("/login")
def login():
    if session.get("user_id", None) is None:
        return github.authorize()
    else:
        return redirect(url_for("dashboardFunc"))

# Callback function after returning from github oauth
@app.route("/gh-callback")
@github.authorized_handler
def authorized(access_token):
    if access_token is None:
        return redirect(url_for("index"))
    session["user_id"] = access_token
    return redirect(url_for("dashboardFunc"))


@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect(url_for("index"))

######################
## Page Routes

# Index
@app.route("/", methods = ['GET', 'POST'])
def index():
    print 'running initial route'
    return render_template("landing.html")


# Dashboard 
# List of projects, selecting a project takes you to the main application
@app.route('/dashboard', methods = ['GET', 'POST'])
def dashboardFunc():
    projects = github.get("user/repos")
    return render_template("dashboard.html", projects=projects)




# Planning Page
# Sprint planning is done here
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




######################
## "API" Routes
## We shouldn't need a backend db, but we should build up some backend routes to hit the GitHub API so our pages can asynchronously load data

# Get the list of issues for a project
@app.route("/issues/<project>", methods=["GET"])
def issues(project):
    pass


