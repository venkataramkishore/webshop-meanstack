var Category = require('mongoose').model('Category');
var commonFn = require('../utilities/common');

exports.getCategories = function(req, res){
	Category.find({}).exec(function(err, collection){
		res.status(200);
		res.send(collection);
	});
};

exports.getCategoryById = function(req, res){

	Category.findOne({_id:req.params.title}).exec(function(err, category){
		if(!Category){
			res.status(404);
			res.send({reason:'Cant find Category!'});
		}else{
			res.send(category);	
		}
	});
};

exports.createCategory = function(req, res, next){

	var categoryData = req.body;
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		Category.create(categoryData, function(err, category){
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err = new Error('Duplicate Category');
				}
				res.status(400);
				return res.send({reason:err.toString()});
			}else{
				res.send(category);
			}
		});
	}
};

exports.updateCategory = function(req, res){

	var categoryData = req.body;
	var validResult = commonFn.validateObject(req);
	console.log(" <categoryData> "+JSON.stringify(categoryData, null ,2));
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		var catData = new Category(categoryData);
		catData.update(categoryData,function(err, category){
				if(err){
					res.status(400);
					return res.send({reason: err.toString()});
				}
				res.status(200);
				res.send(category);
			}
		);
	}
};

exports.getCategoryByTitle = function(req, res){
	Category.find({title:req.params.title}).exec(function(err, collection){
		if(!collection){
			res.status(404);
			res.send({reason:'Cant find Category!'});
		}else{
			res.send(collection);	
		}
	});
};

exports.deleteCategory = function(req, res){
	if(!req.params.title){
		res.status(400);
		res.send({reason:"Id value is missing."});
	}
	Category.remove({_id:req.params.title}, function(err, category){
		if(err){
			res.status(400);
			res.send({reason:err.toString()});		
		}else{
			res.status(200);
			res.send(category);
		}
	});
};