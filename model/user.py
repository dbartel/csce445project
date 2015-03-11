from mongoengine import *

class User(Document):
	name = StringField(required = True)
	projects = ListField(StringField(max_length=50))
	
