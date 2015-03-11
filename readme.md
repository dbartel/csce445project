# CSCE 445 Project

## Dependencies

- Flask

	pip install flask

- [MongoDB](http://www.mongodb.org/)

## Running the Application

1. Run *agil.py*

	python agil.py

2. Navigate to *localhost:5000*

## Tools/Frameworks

- **Backend Tools/Frameworks**: [Flask](http://flask.pocoo.org/), [MongoDB](http://www.mongodb.org/), [MongoEngine](http://mongoengine.org/)
- **Frontend Tools/Frameworks**: [AngularJS](https://angularjs.org/), [Foundation](http://foundation.zurb.com/)
- Use [Angular UI Router](http://angular-ui.github.io/ui-router/) for navigation
- Use [GitHub OAuth](https://developer.github.com/v3/oauth/) for authentication
- Use [Reveal.js](http://lab.hakim.se/reveal-js/#/) for slideshow presenation
- Use [Require.js](http://requirejs.org/) for module loading

## Pages/States

- **Landing Page**
  - Log in with GitHub, Select/Add projects
- **Planning**
  - View backlog
  - Start/Stop sprint
- **Sprint**
  - View board
  - Assign/Complete Issues
- **Retrospective**
  - Burndown Charts (full backlog and sprint)
  - Generate presentation