var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	title: {type:String, require:'{PATH} is required!', unique:true},
	description: {type:String, require:'{PATH} is required!'}
});

var Category = mongoose.model('Category', catSchema);

function createDefaultCategory(){
	Category.find({}).exec(function(err, collection){
		if(collection.length == 0){
			Category.create({title:'Category 1', description:'Category description of products'});
			Category.create({title:'Category 2', description:'Category description of products'});
			Category.create({title:'Category 3', description:'Category description of products'});
			Category.create({title:'Category 4', description:'Category description of products'});
		}
	})
}

exports.createDefaultCategory = createDefaultCategory;