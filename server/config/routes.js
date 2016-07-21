var auth = require('./auth');
var mongoose = require('mongoose');
var users = require('../controllers/users');
var courses = require('../controllers/courses');
var categoryCtrl = require('../controllers/categoryCtrl');
var subCategoryCtrl = require('../controllers/subCategoryCtrl');
var productCtrl = require('../controllers/productCtrl');
var add2CartCtrl = require('../controllers/Add2CartCtrl');

var User = mongoose.model('User');



module.exports = function(app){

	app.get('/api/users', auth.requiresRoles('Admin') , users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.get('/api/courses', courses.getCourses);
	app.get('/api/courses/:id', courses.getCourseById);

	app.get('/api/category', categoryCtrl.getCategories);
	app.get('/api/category/:title', categoryCtrl.getCategoryById);
	app.get('/api/category/:title', categoryCtrl.getCategoryByTitle);
	app.post('/api/category', categoryCtrl.createCategory);
	app.put('/api/category', categoryCtrl.updateCategory);
	app.delete('/api/category/:title', categoryCtrl.deleteCategory);

	app.get('/api/subcategory',  subCategoryCtrl.getSubCategories);
	app.get('/api/subcategory/:title', subCategoryCtrl.getSubCategoryByTitle);
	app.post('/api/subcategory', auth.requiresRoles('Admin'), subCategoryCtrl.createSubCategory);
	app.put('/api/subcategory', auth.requiresRoles('Admin'), subCategoryCtrl.updateSubCategory);
	app.delete('/api/subcategory/:title', subCategoryCtrl.deleteSubCategory);

	app.get('/api/product', productCtrl.getProducts);
	app.get('/api/product/:catTitle/:subcatTitle', productCtrl.getProductsByTitle);
	app.post('/api/product', auth.requiresRoles('Admin'), productCtrl.createProduct);
	app.put('/api/product', auth.requiresRoles('Admin'), productCtrl.updateProduct);
	app.delete('/api/product/:id', productCtrl.deleteProduct);

	app.get('/api/cart/', add2CartCtrl.getCartItems);
	app.get('/api/cart/:email', add2CartCtrl.getCartItemsByEmail);
	app.get('/api/cart/:id', add2CartCtrl.getCartItemById);
	app.post('/api/cart', add2CartCtrl.createCartItem);
	app.put('/api/cart', add2CartCtrl.updateCartItem);
	app.delete('/api/cart/:id', add2CartCtrl.deleteCartItem);

	app.get('/partials/*', function (req, res){
		console.log(JSON.stringify(req.params, null , 2));
		console.log('File to render --> ../../public/app/'+req.params[0]);
		res.render('../../public/app/'+req.params[0]);
	});

	app.all('/api/*',function(req, res){
		res.status(404);
		res.send('Not a valid url..!');
	});

	app.get('/*', function(req, res){
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

	app.post('/login', auth.authenticate);
	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

}


