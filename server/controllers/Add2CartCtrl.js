var Add2Cart = require('mongoose').model('Add2Cart');
var commonFn = require('../utilities/common');

exports.getCartItems = function(req, res){

	Add2Cart.find({}).exec(function(err, collection){
		res.status(200);
		res.send(collection);
	});
};

exports.getCartItemsByEmail = function(req, res){
	console.log('Inside getCartItemsByEmail function ' + req.params.email);
	var inputType = req.params.email || '';
	var query = {};
	if(inputType.indexOf('@') != -1){
		query.userName = inputType;
	}
	Add2Cart.find(query).exec(function(err, collection){
		res.status(200);
		res.send(collection);
	});
};

exports.getCartItemById = function(req, res){

	var inputType = req.params.id || '';
	var query = {};
	if(inputType.indexOf('@') != -1){
		query.userName = inputType;
	}
	Add2Cart.findOne({_id:req.params.id}).exec(function(err, add2Cart){
		if(!add2Cart){
			res.status(404);
			res.send({reason:'Cant find Category!'});
		}else{
			res.send(add2Cart);	
		}
	});	

};


exports.createCartItem = function(req, res, next){

	var cartItemData = req.body;
	console.log("Cart Item "+ JSON.stringify(cartItemData));
	var validResult = commonFn.validateObject(req);
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{

		Add2Cart.create(cartItemData, function(err, add2Cart){
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err = new Error('Duplicate Category');
				}
				res.status(400);
				return res.send({reason:err.toString()});
			}else{
				res.send(add2Cart);
			}
		});
	}
};

exports.updateCartItem = function(req, res){

	var cartItemData = req.body;
	var validResult = commonFn.validateObject(req);
	
	if(!validResult.valid){
		res.status(400);
		res.send({reason:validResult.message});
	}else{
		var cartData = new Add2Cart(cartItemData);
		cartData.update(cartItemData,function(err, add2Cart){
				if(err){
					res.status(400);
					return res.send({reason: err.toString()});
				}
				res.status(200);
				res.send(add2Cart);
			}
		);
	}
};

exports.deleteCartItem = function(req, res){
	if(!req.params.id){
		res.status(400);
		res.send({reason:"Id value is missing."});
	}
	Add2Cart.update({_id:req.params.id,status:"Cancelled"}, function(err, addToCart){
		if(err){
			res.status(400);
			res.send({reason:err.toString()});		
		}else{
			res.status(200);
			res.send(addToCart);
		}
	});
};