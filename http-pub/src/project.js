/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, define, brackets: true, $, window, navigator */


require.config({
    baseUrl: '../src',
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

define(['knockout', 'router', 'routerSettings', 'dal', 'views/screen', 'views/project'], function (ko, Router, RouterSettings, Dal, ScreenViewModel, ProjectViewModel) {
    "use strict";


    function App() {

        var that = this;

        this.router = new Router();

        this.dal = new Dal();

        this.dal.baseURL = '../public/';

        this.screenView = new ScreenViewModel(this);

        this.projectView = new ProjectViewModel(this);

        this.viewModel = {};


        this.init = function (id) {
            that.projectView.init(id);
            that.screenView.setScreen('screen-detail');
        };

        this.navigateTo = function (path) {
            this.router.route(path);
        };




    }


    var GISVIZ = new App();


    $(function () {
        ko.applyBindings({
            screen: GISVIZ.screenView,
            projectsView: GISVIZ.projectsView
        });

        var projectId = window.location.pathname.replace('/public/','');

        GISVIZ.init(projectId);


    });



});
