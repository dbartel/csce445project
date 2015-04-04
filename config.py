from flask import Flask
import key

#Configuration file

# DATABASE = "c:/tmp/agil.db"
DEBUG = True
# SECRET_KEY = 12345
# USERNAME = "admin"
# PASSWORD = "password"
GITHUB_CLIENT_ID = key.client_id
GITHUB_CLIENT_SECRET = key.client_secret
SECRET_KEY = key.secret_key



app = Flask("agil")
app.config.from_object(__name__)

