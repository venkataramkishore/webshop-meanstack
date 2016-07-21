var utilities = require('../utilities/encryption');
var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.userName = userData.userName.toLowerCase();
	console.log("User Data : " + JSON.stringify(userData,null,2));
	userData.salt = utilities.createSalt();
	userData.hashPwd =  utilities.createHashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf('E11000')>-1){
				err = new Error('Duplicate Username');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send(user);
		})
	})
};
exports.updateUser = function(req, res, next){
	var userData = req.body;

	if(req.user._id !=userData._id && !req.user.hasRole('Admin')){
		res.statu(403);
		res.end();
	}
	req.user.firstName = userData.firstName;
	req.user.lastName = userData.lastName;
	req.user.userName = userData.userName;

	req.user.house = userData.house;
	req.user.street = userData.street;
	req.user.area = userData.area;
	req.user.city = userData.city;
	req.user.state = userData.state;
	req.user.pincode = userData.pincode;

	if(userData.password && userData.password.length > 0 ){
		req.user.salt = utilities.createSalt();
		req.user.hashPwd =  utilities.createHashPwd(userData.salt, userData.password);
	}
	req.user.save(function(err){
		if(err){
			res.status(400);
			return res.send({reason: err.toString()});
		}
		res.send(req.user);
	});
	
};