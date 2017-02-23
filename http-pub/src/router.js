// jscs: disable safeContextKeyword

/*global window, document */

define([
    'knockout',
    'crossroads',
    'underscore',
    'history'
], function (ko, crossroads, _) {


    function Router() {

        var that    = this,
            router  = crossroads.create();

        //initilize route and panel
        this.defaultRoute = ko.observable();
        this.currentRoute = ko.observable();
        this.getCurrentPanel = ko.observable();
        this.error  = ko.observable().extend({
            notify: 'always'
        });

        this.defaultRoute.subscribe(function (route) {
            this.currentRoute(route);
        }, this);

        this.currentRoute.subscribe(function (route) {
            this.getCurrentPanel(route.panelGroup);
        }, this);

        this.beforeRoute = function () {
            return '';
        };

        this.afterRoute = function () {
            return '';
        };

        this.transitionTo = function (path) {
            var hash, splited, state = {};
            path = path || window.location.pathname;
            if (path.indexOf('#') !== -1) {
                splited = path.split('#');
                path  = splited[0];
                hash  = splited[1];
                state = { hash: hash };
            }

            window.History.pushState(state, "", path);

            if (hash) {
                window.History.replaceState("", "", splited.join('#'));
            }
        };

        function getUrl() {
            return document.location.pathname + document.location.search;
        }

        this.parse = function (url) {
            var ismatch = router._routes.some(function (r) {
                return r.match(url);
            });
            // if route not exits, redirect to home url
            if (!ismatch) {
                that.error("ROUTE_NOT_EXISTS");
                window.History.replaceState({}, "", that.defaultRoute().url);
            } else {
                router.parse(url);
            }
        };

        this.routeCurrentUrl = function () {
            that.parse(getUrl());
        };

        this.parseUrl = function (request) {
            if (request !== getUrl()) {
                this.transitionTo(request);
            } else {
                that.parse(request);
            }
        };

        this.route = function () {
            this.transitionTo.apply(this, arguments);
        };

        this.init = function (routes, defaultRoute) {
            //initilize route with a default route
            if (defaultRoute) {
                this.defaultRoute(defaultRoute);
            } else {
                this.defaultRoute(routes[Object.keys(routes)[0]]);
            }

            Object.keys(routes).forEach(function (k) {
                (function (route) {
                    router.addRoute(route.url, function () {
                        var params = _.object(route.paramsNames, arguments);
                        route.params = params;
                        that.currentRoute(route);
                    });
                }(routes[k]));
            });

            window.History.Adapter.bind(window, 'statechange', function () {
                that.parse(getUrl());
            });
        };
    }

    return Router;
});
