/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, module*/

    // Retrieve
var MongoClient = require('mongodb').MongoClient;


module.exports = function (cb) {

    var dbConnection;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/gis", function(err, db) {
      if(!err) {
        console.log("We are connected");
          dbConnection = db;
          cb(dbConnection)
      } else {
          console.log(err);
      }

    });
};




