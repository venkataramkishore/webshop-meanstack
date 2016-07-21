angular.module('app').factory('mvOrder', ['$resource', function ($resource) {
	var OrderResource = $resource('/api/cart/:id/:email', {id:"@id", email:"@email"}, {
		update:{
			method: 'PUT',
			isArray:false
		}
	});

	return OrderResource;
}])