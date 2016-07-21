var express = require('express');

var env = process.env.NODE_ENV ;//= 'development';

var app = express();

var appConfig = require('./server/config/config')[env];
console.log("Config Data " + JSON.stringify(appConfig, null ,2));
require('./server/config/express')(app, appConfig);
require('./server/config/mongoose')(appConfig);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.listen(appConfig.port);
console.log("Listening to port "+ appConfig.port + "...");

app.use(function(req, res, next){

	console.log(req.user);
	next();
});