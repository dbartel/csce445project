from flask import Flask


DATABASE = "c:/tmp/agil.db"
DEBUG = True
SECRET_KEY = 12345
USERNAME = "admin"
PASSWORD = "password"

app = Flask(__name__)
app.config.from_object(__name__)

