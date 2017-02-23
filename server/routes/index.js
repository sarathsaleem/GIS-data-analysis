/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, module*/

var express = require('express');

var Projects = require('../src/projects');

module.exports = function (db) {

    var app = express(),
        projects = new (new Projects())(db);

    app.get('/', function (req, res) {
        res.render('../http-pub/index.html');
    });

    app.get('/public/:id', function (req, res) {
        var projectId = req.params.id;
        res.render('../http-pub/project.html');
    });


    app.get('/projects', function (req, res) {
        res.send(projects.getProjectList());
    });
    app.get('/project/:id', function (req, res) {
        var projectId = req.params.id;
        projects.getProject(projectId, res);
    });
     app.get('/project/data/:id', function (req, res) {
        var projectId = req.params.id;
        projects.getProjectData(projectId, res);
    });

     app.post('/project', function (req, res) {
        var data = req.body;
        projects.createProject(data, res);
    });


    return app;
};
