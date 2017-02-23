/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['knockout', 'models/projects', 'leaflet'], function (ko, Projects, ignore) {
    "use strict";


    function ProjectsViewModel(app) {

        var that = this;

        this.projects = new Projects(app);

        this.newProjectName = ko.observable('');
        this.newProjectDesc = ko.observable('');


        this.projects.getProjectList();


        this.openProject = function (id) {
            app.projectView.init(id);
        };

        this.createProject = function () {
            that.projects.addNewProject({
                name :  that.newProjectName(),
                desc :  that.newProjectDesc()
            });
        };

    }

    return ProjectsViewModel;
});
