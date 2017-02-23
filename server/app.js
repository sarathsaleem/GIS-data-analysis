/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, process,__dirname*/

/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser  = require('body-parser');
    //session = require('express-session');*/

   /* Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    Connection = require('mongodb').Connection;


var host = 'localhost';
var port = Connection.DEFAULT_PORT;
var db = new Db('gis', new Server(host, port, {}), {
    native_parser: false
});*/


var app = express();

// all environments

app.set('port', process.env.PORT || 3000);

//app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
//app.use(bodyParser.json());

app.use(express.static('http-pub'));
app.use('/http-pub', express.static('http-pub'));

var db = require('./src/dbConnect');
db(function(db) {
    app.use(routes(db));
});



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

