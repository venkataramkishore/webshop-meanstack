var SubCategory = require('mongoose').model('SubCategory');
var commonFn = require('../utilities/common');

exports.getSubCategories = function(req, res){
	SubCategory.find({}).exec(function(err, collection){
		res.status(200);
		res.send(collection);
	});
};

exports.getSubCategoryById= function(req, res){

	SubCategory.findOne({_id:req.params.id}).exec(function(err, subCategory){
		if(!subCategory){
			res.status(400);
			res.send({reason:'Cant find Sub Category!'});
		}else{
			res.send(subCategory);	
		}
	});
};

exports.createSubCategory = function(req, res, next){

	var subCategoryData = req.body;
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		SubCategory.create(subCategoryData, function(err, subCategory){
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err = new Error('Duplicate SubCategory !');
				}
				res.status(400);
				return res.send({reason:err.toString()});
			}else{
				res.send(subCategory);
			}
		});
	}
};


exports.deleteSubCategory = function(req, res){
	if(!req.params.title){
		res.status(400);
		res.send({reason:"Id value is missing."});
	}
	SubCategory.remove({_id:req.params.title}, function(err, subCategory){
		if(err){
			res.status(400);
			res.send({reason:err.toString()});		
		}else{
			res.status(200);
			res.send(subCategory);
		}
	});
};

exports.updateSubCategory = function(req, res, next){

	var subCategoryData = req.body;
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		var subData = new SubCategory(subCategoryData);
		subData.update(subCategoryData, function(err, subCategory){
				if(err){
					res.status(400);
					return res.send({reason: err.toString()});
				}
				res.status(200);
				res.send(subCategory);
			}
		);
	}
};

exports.getSubCategoryByTitle = function(req, res){
	SubCategory.find({category_title:req.params.title}).exec(function(err, collection){
		if(!collection){
			res.status(404);
			res.send({reason:'Cant find Category!'});
		}else{
			res.send(collection);	
		}
	});
};