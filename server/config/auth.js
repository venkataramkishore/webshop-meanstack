var passport = require('passport');
var crypto = require('crypto');

exports.authenticate = function(req, res, next){
	console.log("res params :: " + JSON.stringify(req.body));
	req.body.username = req.body.username.toLowerCase();
		var auth= passport.authenticate('local', function(err, user){
			if(err){
				console.log("Authenticate :: Error "+err.toString()); 
				return next(err);
			}
			if(!user) {
				console.log("Authenticate :: Not a user : "+ JSON.stringify(user));
				res.send({success:false});
			}
			req.logIn(user, function(err){
				if(err){
					console.log("Authenticate :: Error while logIn : "+ JSON.stringify(err));
					return next(err);
				}
				res.send({success:true, user:user});
			});
		});

		auth(req, res, next);
	};

exports.requiresApiLogin=function(req, res, next){
		if(!req.isAuthenticated())	{
			res.status(403);
			res.end();
		}else{
			next();
		}
};
exports.requiresRoles = function(role){
	return function(req, res, next){
		if(req.isAuthenticated() && req.user.roles.indexOf(role) < 0){
			res.status(403);
			res.end();
		}else{
			next();
		}
	}
};

exports.createSalt=function (){
	return crypto.randomBytes(128).toString('base64');
};
exports.createHashPwd=function (salt, pwd){
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}