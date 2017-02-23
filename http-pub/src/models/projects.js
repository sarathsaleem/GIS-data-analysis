/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['knockout', 'dal'], function (ko, Dal) {
    "use strict";

    function Projects(app) {

        var that = this;

        this.addNewProject = function (data) {

            var newProject = {
                name: data.name,
                desc: data.desc,
                zoomLevel: 12,
                centerPos: [25.271139, 55.307485],
                data: '',
                mapTheme: ''
            };

            app.dal.createProject(newProject, function (data) {
                app.openProject(data.id);
            });

        };

        this.saveproject = function (projectId) {

        };


        this.projectsList = ko.observable();

        this.getProjectList = function () {
            app.dal.getProjectList(function (data) {
                that.projectsList(data);
            });
        };


    }

    return Projects;
});
