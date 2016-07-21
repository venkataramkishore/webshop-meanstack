var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');
var catModel = require('../models/Category');
var subCatModel = require('../models/SubCategory');
var productModel = require('../models/Product');
var add2CartModel = require('../models/Add2Cart');
var purchaseModel = require('../models/Purchases');

module.exports = function(appConfig){
	var MongoDB = mongoose.connect(appConfig.db).connection;
	MongoDB.on('error', function(err) { 
		console.log(JSON.stringify(err,null, 2)); 
	});

	MongoDB.once('open', function() {
	  console.log("Hurray..!! mongodb connection open for "+ appConfig.db);
	});	

	userModel.createDefaultUsers();
	courseModel.createDefaultCourses();
	catModel.createDefaultCategory();
	subCatModel.createDefaultSubCategory();
};
	