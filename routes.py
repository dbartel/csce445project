from flask import Flask, render_template, request, abort, g
from config import app
from controllers import *
from github import Github


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
    print 'running initial route'
    return render_template("index.html")

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
    pass

@app.route('/planning', methods = ['POST'])
def planningFunc():
	print 'running planning route'
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
