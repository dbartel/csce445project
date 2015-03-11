from flask import Flask, render_template
from config import app
from routes import *


if __name__ == "__main__":
	app.run()