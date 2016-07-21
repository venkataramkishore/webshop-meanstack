var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	title: {type:String, require:'{PATH} is required!', unique:true},
	description: {type:String, require:'{PATH} is required!'},
	price: {type:Number, require:'{PATH} is required!'},
	available: {type:Number, require:'{PATH} is required!'},
	sold: {type:Number, require:'{PATH} is required!'},
	category: {type:String, require:'{PATH} is required!'},
	subCategory: {type:String, require:'{PATH} is required!'},
	imgUrl:{type:String},
	tags: [String]
});

var Product = mongoose.model('Product', productSchema);

function createDefaultProducts(){
	Product.find({}).exec(function(err, collection){
		if(collection.length == 0){
			Product.create({title:'product1', description:'This is product description 1', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 1',
				subCategory: 'Sub Category 1',
				tags:['Product1']});
			Product.create({title:'product2', description:'This is product description 2', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 1',
				subCategory: 'Sub Category 1',
				tags:['Product1']});
			Product.create({title:'product3', description:'This is product description 3', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 2',
				subCategory: 'Sub Category 2',
				tags:['Product']});
			Product.create({title:'product4', description:'This is product description 4', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 2',
				subCategory: 'Sub Category 2',
				tags:['Product2']});
			Product.create({title:'product5', description:'This is product description 5', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 3',
				subCategory: 'Sub Category 3',
				tags:['Product']});
			Product.create({title:'product6', description:'This is product description 6', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 3',
				subCategory: 'Sub Category 3',
				tags:['Product']});
			Product.create({title:'product7', description:'This is product description 7', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 4',
				subCategory: 'Sub Category 4',
				tags:['Product']});
			Product.create({title:'product8', description:'This is product description 8', 
				price: 10.5,
				available: 20,
				sold: 5,
				category: 'Category 4',
				subCategory: 'Sub Category 4',
				tags:['Product']});
		}
	})
}

exports.createDefaultProducts = createDefaultProducts;