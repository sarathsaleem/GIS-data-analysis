/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, module*/

var crypto = require('crypto'),
    fs = require('fs');

module.exports = function () {

    function Projects(db) {

        var that = this;

        this.db = db;

        this.getUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = crypto.randomBytes(1)[0] % 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        this.data = [{
            "name": "dubai_abu-dhabi_admin",
            "id": "de93db54-5f3c-4a14-8276-93770186dc2c"
        }, {
            "name": "dubai_abu-dhabi_aeroways",
            "id": "0a2af16d-2a4f-4c85-82f2-56a47b14e7c1"
        }, {
            "name": "dubai_abu-dhabi_amenities",
            "id": "76567926-53cb-4eb9-a4a2-648ee6d6aff2"
        }, {
            "name": "dubai_abu-dhabi_buildings",
            "id": "ff778413-7dea-4d4a-bf38-c5e4cc20d545"
        }, {
            "name": "dubai_abu-dhabi_landusages",
            "id": "dfdbbd53-9063-404b-b195-a79a5c2494c0"
        }, {
            "name": "dubai_abu-dhabi_places",
            "id": "8a3c5066-31a1-41f3-9cd8-3dc3fd948e8d"
        }, {
            "name": "dubai_abu-dhabi_roads",
            "id": "f721e206-4f30-421e-928d-545ecd5cfe7c"
        }, {
            "name": "dubai_abu-dhabi_roads_gen0",
            "id": "609688a1-5415-4da3-a5d5-0c406099feda"
        }, {
            "name": "dubai_abu-dhabi_roads_gen1",
            "id": "8b081bfa-d865-4816-b47f-5aaf5dd0998d"
        }, {
            "name": "dubai_abu-dhabi_transport_areas",
            "id": "7a2addbf-06eb-486c-80bc-3d1e7f642f39"
        }, {
            "name": "dubai_abu-dhabi_transport_points",
            "id": "889fa23d-adaf-4ff1-a1b1-b406e47b96d2"
        }, {
            "name": "dubai_abu-dhabi_waterareas",
            "id": "e6085d3d-0701-4dc0-9421-50bd230f9bd5"
        }, {
            "name": "dubai_abu-dhabi_waterways",
            "id": "19b65246-4023-4162-aaa5-21203ac063dd"
        }];

        this.getName = function (id) {
            return that.data.filter(function (data) {
                return data.id === id;
            })[0].name;

        };


        this.getProjectList = function () {

             that.db.collection('projects', function(err, collection) {
                 // Fetch all docs for rendering of list
                collection.find().toArray(function(err, items) {
                  console.log(items);
                });

            });
            return that.data;
        };

        this.getProject = function (projectId, res) {

            /*var projectName = that.getName(projectId);

            that.db.collection('projects', function(err, collection) {
                 // Fetch all docs for rendering of list
                collection.find({ id : projectId }).toArray(function(err, result) {
                  res.send(result[0]);
                });

            });*/

             var data = that.data.filter(function (data) {
                return data.id === projectId;
            })[0];

            res.send(data);


        };

        this.getProjectData = function (projectId, res) {
            var projectName = that.getName(projectId);

            fs.readFile(__dirname + '../../../data/dubai/' + projectName + '.geojson', function (err, data) {
                if (err) {
                    throw err;
                }
                res.send(data);
            });

        };

        this.createProject = function (data, res) {

            that.db.collection('projects', function(err, collection) {

              data.id = that.getUUID();

              // Insert doc
              collection.insert(data, {safe:true}, function(err, result) {
                 res.send(result.ops[0]);
              });
            });

        };

    }

    return Projects;
};
