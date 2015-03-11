DROP table IF EXISTS project
CREATE table project (
	pkey integer primary key autoincrement
	name text not null
)

DROP table IF EXISTS issue
CREATE table issue (
	pkey integer primary key autoincrement
	name text not null
	description text
	projectId integer not null
	userId integer
)

DROP table IF EXISTS sprint
CREATE table sprint (
	pkey integer primary key autoincrement
	projectId integer not null
	status text

)

DROP table IF EXISTS user
CREATE table userId (
	pkey integer primary key autoincrement
	name text not null
)

DROP table IF EXISTS userProjects
CREATE table userProjects (
	pkey integer primary key autoincrement
	userId integer not null
	projectId integer not null
)