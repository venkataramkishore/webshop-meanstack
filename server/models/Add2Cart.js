var mongoose = require('mongoose');

var add2cartSchema = mongoose.Schema({
	userName: {type:String, require:'{PATH} is require..!!'},
	firstName: {type:String, require:'{PATH} is require..!!'},
	lastName: {type:String, require:'{PATH} is require..!!'},
	totalPrice: {type:String, require:'{PATH} is require..!!'},
	prod_title: {type:String, require:'{PATH} is require..!!'},
	quantity: {type:String, require:'{PATH} is require..!!'},
	category: {type:String, require:'{PATH} is require..!!'},
	subCategory:{type:String, require:'{PATH} is require..!!'},
	status:{type:String, require:'{PATH} is require..!!'},
	ord_time:{type:Number, require:'{PATH} is require..!!'},
	createdBy:{type:String},
	modifiedBy:{type:String},
	mod_time:{type:Number}
});


var Add2Cart = mongoose.model('Add2Cart', add2cartSchema);
