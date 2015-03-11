from mongoengine import *
from . import issue


class Sprint(Document):
	project = StringField()
	startDate = DateTimeField() #Date?
	endDate = DateTimeField()
	issues = ListField(Issue())
