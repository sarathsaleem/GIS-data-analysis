/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window,L */

define(['knockout', 'models/project', 'leaflet' , 'leafletGroupedlayercontrol'], function (ko, Project, ignore) {
    "use strict";


    var map;

    function ProjectViewModel(app) {

        var that = this;

        this.project = new Project(app);

        var token = "pk.eyJ1Ijoic2FyYXRoc2FsZWVtIiwiYSI6ImNpZWxqeW9jeDAwM2N1aG03cXRlbzY3N3gifQ.2k4e5ry98wH_UNgVvZlxDw";

        var mapBoxurl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token;

        this.project.id.subscribe(function(){
            that.render(that.project.toData());
        });
        this.project.data.subscribe(function(data){
            that.addData(that.project.toData().data);
        });

        var MapboxDark = L.tileLayer(mapBoxurl, {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.dark'
        });
        var MapboxLight = L.tileLayer(mapBoxurl, {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.light'
        });
        var MapboxStreets = L.tileLayer(mapBoxurl, {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.streets'
        });
         var MapboxComic = L.tileLayer(mapBoxurl, {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.comic'
        });



        this.addDataList = function () {

            var list = '';

            this.data.forEach(function (name) {
                list += '<li>' + name + '</li>';
            });

            $('.data-menu').html(list);
        };

        this.showData = ko.observable(false);

        this.toggleShowData = function () {
            this.showData(!this.showData());
        };


        this.render = function (projectData) {

            if (map) {
                map.remove();
            }

            map = L.map('mapScene').setView([25.271139, 55.307485], 11);

            MapboxLight.addTo(map);

             var basemaps = {
                 MapboxDark: MapboxDark,
                 MapboxLight : MapboxLight,
                 MapboxStreets : MapboxStreets,
                 MapboxComic : MapboxComic,
                 Streets: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                     maxZoom: 19,
                     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                 })
             };

            L.control.groupedLayers(basemaps, {}).addTo(map);


        };

        this.addData = function (data) {
             L.geoJson(data).addTo(map);
        };

        this.publishProject = function () {
            var windowObjectReference;
            var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=420,height=230";

            var url = '/public/'+ that.project.id();
            var name =  that.project.name();

            windowObjectReference = window.open(url, name, strWindowFeatures);

        };


        this.init = function (id) {
            that.project.init(id);
        };

    }

    return ProjectViewModel;
});
