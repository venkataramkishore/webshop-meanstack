var Product = require('mongoose').model('Product');
var commonFn = require('../utilities/common');

exports.getProducts = function(req, res){
	Product.find({}).exec(function(err, collection){
		res.status(200);
		res.send(collection);
	});
};

exports.getProductById = function(req, res){

	Product.findOne({_id:req.params.id}).exec(function(err, product){
		if(!product){
			res.status(404);
			res.send({reason:'Cant find Category!'});
		}else{
			res.send(product);	
		}
	});
};

exports.getProductsByTitle = function(req, res){
	
	if(req.params.catTitle && req.params.subcatTitle){
		
		var p_catTitle = req.params.catTitle;
		var p_subCatTitle = req.params.subcatTitle;
		console.log("LOgging :: " + p_catTitle+ "  " + p_subCatTitle);
		Product.find({category:p_catTitle, subCategory:p_subCatTitle}).exec(function(err, collection){
			if(!collection){
				res.status(400);
				res.send({reason:"Dont find any products"});
			}else{
				res.status(200);
				res.send(collection);	
			}
		});	
	}else{
		res.status(400);
		res.send({reason:'Either Category or Sub Category are missing'});
	}
	
};

exports.createProduct = function(req, res, next){

	var productData = req.body;
	console.log(JSON.stringify(productData, null,2));
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		Product.create(productData, function(err, product){
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err = new Error('Duplicate Category');
				}
				res.status(400);
				return res.send({reason:err.toString()});
			}else{
				res.send(product);
			}
		});
	}
};


exports.deleteProduct = function(req, res){
	
	if(!req.params.id){
		res.status(400);
		res.send({reason:"Id value is missing."});
	}
	Product.remove({_id:req.params.id}, function(err, product){
		if(err){
			res.status(400);
			res.send({reason:err.toString()});		
		}else{
			res.status(200);
			res.send(product);
		}
	});
};

exports.updateProduct = function(req, res, next){

	var productData = req.body;
	console.log(JSON.stringify(productData, null,2));
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		var prodData = new Product(productData);
		prodData.update(productData, function(err, product){
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err = new Error('Duplicate Category');
				}
				res.status(400);
				return res.send({reason:err.toString()});
			}else{
				res.send(product);
			}
		});
	}
};