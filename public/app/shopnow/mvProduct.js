angular.module('app').factory('mvProduct', ['$resource', function($resource){
	var ProductResource = $resource('/api/product/:id/:catTitle/:subcatTitle', 
		{_id:"@id", catTitle:"@catTitle", subcatTitle:"@subcatTitle"}, {
		update:{
			method: 'PUT',
			isArray:false
		},
		delete:{
			method:'DELETE',
			isArray:false
		},
		save:{
			method:'POST',
			isArray:false	
		}
	});

	return ProductResource;
}]);