/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['dal'], function (Dal) {
    "use strict";


    var baseUrl = '';

    function request(options, callback, scope) {

        if (scope.baseUrl) {
            baseUrl = scope.baseUrl;
        }

        var base = $.extend({
            url: baseUrl,
            dataType: 'json',
            method: 'get',
            contentType: 'application/json',
            error: function (response, status, error) {
                if (response.status === 403) {
                    console.log("Error:");
                }
            },
            complete: function (response, status) {
                callback.call(scope, status !== 'success', response.responseJSON || response.responseText);
            }
        }, options);

        scope = scope || window;

        if (!('processData' in base) && base.contentType === 'application/json') {
            // This is so we send a JSON request body as JSON
            base.processData = (base.method.toLowerCase() === 'get');
        }

        if (!base.processData && typeof (base.data) === 'object') {
            // As above, this is to send a JSON request body
            base.data = JSON.stringify(base.data);
        }

        $.ajax(base);

    }

    function Dal() {

        this.baseURL = '';

        this.getProjectList = function (cb) {

            request({ url :  '/projects'}, function (err, data) {
                if (!err) {
                    cb(data);
                } else {
                    console.error('Cannot get getProjectList');
                }
            }, this);

        };

        this.getProject = function (id, cb) {

            var url = '/project/' + id ;

            request({ url : url }, function (err, data) {
                if (!err) {
                    cb(data);
                } else {
                    console.error('Cannot get getProject');
                }
            }, this);

        };

         this.getProjectData = function (id, cb) {

            var url = '/project/data/' + id ;

            request({ url : url }, function (err, data) {
                if (!err) {
                    cb(data);
                } else {
                    console.error('Cannot get getProject');
                }
            }, this);

        };

        this.createProject = function (data, cb) {

            var url = '/project/';

            request({ url : url , method : 'post', data : data }, function (err, data) {
                if (!err) {
                    cb(data);
                } else {
                    console.error('Cannot get getProject');
                }
            }, this);

        };


    }

    return Dal;
});
