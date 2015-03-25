from flask import Flask

#Configuration file

DATABASE = "c:/tmp/agil.db"
DEBUG = True
SECRET_KEY = 12345
USERNAME = "admin"
PASSWORD = "password"

app = Flask("agil")
app.config.from_object(__name__)

