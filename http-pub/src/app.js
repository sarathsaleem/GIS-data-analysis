/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, define, brackets: true, $, window, navigator */


require.config({
    baseUrl: './src',
    // urlArgs: "bust=" + (new Date()).getTime(), //prevent cache for testing
    paths: {
        knockout: '../lib/knockout',
        d3: '../lib/d3',
        leaflet: '../lib/leaflet',
        leafletGroupedlayercontrol : '../lib/leaflet.groupedlayercontrol',
        underscore: '../lib/underscore',
        crossroads: '../lib/crossroads',
        history: '../lib/jquery.history',
        signals: '../lib/signals',
        jquery: '../lib/jquery',
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        leafletGroupedlayercontrol : { deps: ['leaflet'] }
    }
});


define(['knockout', 'router', 'routerSettings', 'dal', 'views/screen', 'views/projects', 'views/project'], function (ko, Router, RouterSettings, Dal, ScreenViewModel, ProjectsViewModel, ProjectViewModel) {
    "use strict";


    function App() {

        var that = this;

        this.router = new Router();

        this.dal = new Dal();

        this.screenView = new ScreenViewModel(this);

        this.projectView = new ProjectViewModel(this);

        this.projectsView = new ProjectsViewModel(this);


        this.viewModel = {};


        this.init = function (dataname) {
            this.screenView.initScreen();

            //this.router.init(RouterSettings.app);
        };

        this.navigateTo = function (path) {
            this.router.route(path);
        };

        this.openProject = function (id) {
            that.projectsView.openProject(id);
            that.screenView.setScreen('screen-detail');
            that.navigateTo('projects/' + id);
        };



        this.viewModel = {
            openProject: this.openProject
        };


    }


    var GISVIZ = new App();


    $(function () {
        ko.applyBindings({
            app: GISVIZ.viewModel,
            screen: GISVIZ.screenView,
            projectsView: GISVIZ.projectsView,
            projectView : GISVIZ.projectView
        });

        GISVIZ.init();


        $(".menu .menuLevel1").on('click', 'li', function (e) {
            e.stopPropagation();
        });


        $('.menu .data').on('click', function (e) {
            e.stopPropagation();
         });

    });



});
