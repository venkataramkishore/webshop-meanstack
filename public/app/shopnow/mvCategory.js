angular.module('app').factory('mvCategory', ['$resource', function($resource){
	var CategoryResource = $resource('/api/category/:title', {title:"@title"}, {
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

	return CategoryResource;
}]);