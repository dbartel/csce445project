from flask import Flask, render_template
from config import app
from routes import *
from github import Github



if __name__ == "__main__":
	app.run()