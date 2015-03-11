from mongoengine import *

class Issue(EmbeddedDocument):
	name = StringField()
	description = StringField()