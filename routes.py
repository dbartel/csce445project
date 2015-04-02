from flask import Flask, render_template, request, abort, g
#import flask
from config import app
from controllers import *
from github import Github
import sqlite3
import json

# Connect db before request

#@app.before_request
#def before_request():
#	g.db = sqlite3.connect(app.config['DATABASE'])


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
@app.route("/", methods = ['GET', 'POST'])
def index():
    print 'running initial route'
 
    return render_template("landing.html")

#these routes never run
@app.route('/landing', methods = ['GET', 'POST'])
def githubLogin():
    print 'running landing route'
    username = flask.request.form['username']
    password = flask.request.form['password']
    
    user = Github(str(username), str(password))


@app.route('/dashboard', methods = ['GET', 'POST'])
def dashboardFunc():
    print 'running dashboard route'
    username = request.form['username']
    password = request.form['password']
    #print username
#print password
    data = {}
    try:
        user = Github(str(username), str(password))
    	for repo in user.get_user().get_repos():
            #print repo.name
            #print repo.description
            data[repo.name] = repo.description

    except:
        return render_template("landing.html")
    return render_template("dashboard.html", data = json.dumps(data))

@app.route('/planning', methods = ['POST', 'GET'])
def planningFunc():

	print 'running planning route'
	return render_template("/planning.html")

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
