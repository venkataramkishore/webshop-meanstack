var mongoose = require('mongoose');

var subCatSchema = mongoose.Schema({
	title: {type:String, require:'{PATH} is required!', unique:true},
	category_title: {type:String, require:'{PATH} is required!'},
	description: {type:String, require:'{PATH} is required!'}
});

var SubCategory = mongoose.model('SubCategory', subCatSchema);

function createDefaultSubCategory(){
	SubCategory.find({}).exec(function(err, collection){
		if(collection.length == 0){
			SubCategory.create({title:'Sub Category 1', category_title:'Category 1', description:'Sub Category description of products'});
			SubCategory.create({title:'Sub Category 2', category_title:'Category 2', description:'Sub Category description of products'});
			SubCategory.create({title:'Sub Category 3', category_title:'Category 3', description:'Sub Category description of products'});
			SubCategory.create({title:'Sub Category 4', category_title:'Category 4', description:'Sub Category description of products'});
		}
	})
}

exports.createDefaultSubCategory = createDefaultSubCategory;