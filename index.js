
/**
 * Module dependencies.
 */

var express = require('express');
var urls = require('./routes/urls');
var http = require('http');
var path = require('path');
var cool = require('cool-ascii-faces');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var serveStatic = require('serve-static');

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


// app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(serveStatic(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


urls(app, router);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

