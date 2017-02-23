/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['knockout'], function (ko) {
    "use strict";

    function Project(app) {

        var that = this;

        this.id = ko.observable();
        this.name = ko.observable();
        this.desc = ko.observable();
        this.zoomLevel = ko.observable();
        this.mapTheme = ko.observable();
        this.centerPos = ko.observableArray();

        this.data = ko.observable();

        this.layers = ko.observable();

        this.description = ko.observable();


        this.populateData = function (data , cb) {

            this.name(data.name);
            this.desc(data.desc);
            this.zoomLevel(data.zoomLevel);
            this.mapTheme(data.mapTheme);
            this.centerPos(data.centerPos);

            this.id(data.id);
            if (cb) {
                cb();

            }
        };

        this.addData = function (data) {
            this.data(data);
        };

        this.resetData = function () {
            this.id(null);
            this.name(null);
            this.desc(null);
            this.zoomLevel(null);
            this.mapTheme(null);
            this.centerPos([]);
        };

        this.toData = function () {
            return {
                id: this.id(),
                name: this.name(),
                desc: this.desc(),
                zoomLevel: this.zoomLevel(),
                mapTheme: this.mapTheme(),
                centerPos: this.centerPos(),
                data : this.data()
            };
        };


        this.getProject = function (id) {
            app.dal.getProject(id, function (data) {
                that.populateData(data);
                app.dal.getProjectData(id, function (data) {
                    that.addData(data);
                });
            });
        };

        this.init = function (id) {
            that.getProject(id);
        };

    }

    return Project;
});
