var mongoose = require('mongoose');

var purchaseSchema = mongoose.Schema({
		userName:{type:String, require:'{PATH} is required!'},
		category:{type:String, require:'{PATH} is required!'},
		subCategory:{type:String, require:'{PATH} is required!'},
		totalPrice:{type:String, require:'{PATH} is required!'},
		when:{type:Date, require:'{PATH} is require'},
		items:[Object],
	});

var Purchase = mongoose.model('Purchase', purchaseSchema);
