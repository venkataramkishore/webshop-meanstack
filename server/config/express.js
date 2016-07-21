var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, appConfig){
	function compile(str, path){
		return stylus(str).set('filename', path);
	}

	app.set('views', appConfig.rootPath+'/server/views');
	app.set('view engine', 'jade');
	app.use(stylus.middleware(
	{
		src:appConfig.rootPath + '/public',
		compile:compile

	}));


	app.use(express.static(appConfig.rootPath+ '/public'));
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(session({secret:'Multi vision unicorns'}));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());

}
