/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['knockout'], function (ko) {
    "use strict";

    function ScreenViewModel(app) {


        var that = this;

        this.showCreateScreen = ko.observable(false);
        this.showOpenScreen = ko.observable(false);

        this.setScreen = function (screenId) {
            $('.pages').fadeOut();
            $('#'+screenId).fadeIn();
        };

        this.addNewProject = function () {

        };

        this.saveproject = function (projectId) {

        };

        this.initScreen = function () {
            $('.pages').fadeOut();
            $('#screen-projects').fadeIn();
            that.closeCreate();
            that.closeOpenScreen();
            app.navigateTo('/');
        };

        this.createNew = function () {
             that.showCreateScreen(true);
        };

        this.closeCreate = function () {
             that.showCreateScreen(false);
        };

        this.openScreen = function () {
             that.showOpenScreen(true);
        };

        this.closeOpenScreen = function () {
             that.showOpenScreen(false);
        };


    }

    return ScreenViewModel;
});
