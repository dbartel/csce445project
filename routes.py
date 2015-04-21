from flask import Flask, render_template, request, abort, g, redirect, session, url_for
from flask.ext.github import GitHub

#import flask
from config import app
import json

# for sorting dictionary arrays
from operator import itemgetter

# Initialize flask-github
github = GitHub(app)


###########################
## Custom Error Handers

@app.errorhandler(401)
def authorization_required(e):
    return render_template("unauthorized.html"), 401


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
        g.username = github.get("user")["login"]

@app.route("/login")
def login():
    if session.get("user_id", None) is None:
        return github.authorize("repo")
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


# Aborts the request if the user isn't authorized
def checkAuth():
    if session.get("user_id", None) is None:
        abort(401)


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
    # checkAuth()
    projects = github.get("user/repos")
    return render_template("dashboard.html", projects=projects)




# Planning Page
# Sprint planning is done here
@app.route('/<owner>/<project>/planning', methods = ['POST', 'GET'])
def planningFunc(project, owner):
    return render_template("planning.html", project=project, owner=owner)


@app.route('/<owner>/<project>/', methods = ['POST'])
def projectFunc(owner, project):
    return render_template("overview.html", project=project, owner=owner) 

@app.route('/<owner>/<project>/retrospective', methods = ['GET'])
def retrospectiveFunc(owner, project):
    print 'check'
    pass

@app.route('/<owner>/<project>/sprint', methods = ['GET'])
def sprintFunc(owner, project):
    return render_template("sprint.html", project=project, owner=owner)

######################
## "API" Routes
## We shouldn't need a backend db, but we should build up some backend routes to hit the GitHub API so our pages can asynchronously load data

# Get the list of all issues for a project
#Pass in a sprintid to get the issues for that sprint
@app.route("/issues/<project>", methods=["GET"])
def issues(project):
        sprintId = request.args.get("sprintid", "*")
        owner = request.args.get("owner", None)
        api_endpoint = "repos/{0}/{1}/issues?milestone={2}".format(owner, project, sprintId)

        issues = github.get(api_endpoint)
        if len(issues) == 0:
            status = 204
        else:
            status = 200
        return json.dumps(issues), status


# Get the backlog for a project (open issues not assigned to any sprint)
@app.route("/backlog/<project>", methods=["GET", "POST"])
def backlogFn(project):
    checkAuth()
    owner = request.args.get("owner", None)
    api_endpoint = "repos/{0}/{1}/issues?milestone=none".format(owner, project)
    backlog = github.get(api_endpoint)
    return json.dumps(backlog)

@app.route("/currentsprint/<project>", methods=["GET", "POST"])
def currentSprintFn(project):
    checkAuth()
    if request.method == "POST":
        sprint_id = request.args.get("sprintid", None)
        issue_id = request.args.get("issueid", None)
        owner = request.args.get("owner", None)
        if sprint_id is None or issue_id is None:
            abort(400)
        else:
            params = {
                "milestone":sprint_id
            }

            jparam = json.dumps(params)
            api_endpoint = "repos/{0}/{1}/issues/{2}".format(owner,project,issue_id)
            github.patch(api_endpoint, data=jparam)
            return "Success", 201
    else:
        abort(400)

#Get the list of open sprints
#POST with the params "title" and "due_on"
@app.route("/sprints/<project>", methods=["GET", "POST"])
def sprintFn(project):
    checkAuth()
    owner = request.args.get("owner", None)
    if request.method == "POST":
        title = request.args.get("title", None)
        due_on = request.args.get("due_on", None)

        # If the params aren't there, send a bad request
        if title is None or due_on is None:
            abort(400)
        else:
            # params = "title={0}".format(title,due_on)

            api_endpoint = "repos/{0}/{1}/milestones".format(owner, project)

            params ={
                "title": title,
                "due_on": due_on
            }
            github.post(api_endpoint, params)
            # github.raw_request("POST", api_endpoint, params)
            return "Success", 201
    else:
        params = {
            "state" : "open",
            "sort" : "due_date",
            "direction": "desc"
        }
        jparams = json.dumps(params)
        api_endpoint = "repos/{0}/{1}/milestones".format(owner, project)
        sprints = github.get(api_endpoint, data=jparams)
        #github sort not working for some reason
        #we want the most recent sprint 
        sprints.sort(key = itemgetter("due_on"), reverse=True)
        if len(sprints) > 0:
            currentSprint = sprints[0]

            #200 OK HTTP Status
            status = 200
        else:
            currentSprint = None
            #204 No Content HTTP Status
            status = 204
        return json.dumps(currentSprint), status