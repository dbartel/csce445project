from mongoengine import *
from . import issue

class Project(Document):
	name = StringField(required = True)
	description = StringField()
	issues = ListField(Issues())