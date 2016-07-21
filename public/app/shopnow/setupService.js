/**
*  Module
*
* Description
*/
angular.module('app').factory('mvSetupServices', ['$http', '$q',  
	function($http, $q) {

	return {
		createCategory:function(item){

			var differed = $q.defer();

			$http.post('/api/category/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
				
			return differed.promise;
		},
		updateCategory:function(item){

			var differed = $q.defer();

			$http.put('/api/category/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
			return differed.promise;
		},
		createSubCategory: function(item){

			var differed = $q.defer();

			$http.post('/api/subcategory/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
			return differed.promise;
		},
		updateSubCategory: function(item){

			var differed = $q.defer();

			$http.put('/api/subcategory/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
			return differed.promise;
		}, 
		createProduct: function(item){

			var differed = $q.defer();

			$http.post('/api/product/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
			return differed.promise;
		},
		updateProduct: function(item){

			var differed = $q.defer();

			$http.put('/api/product/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			}, function(err){
				differed.resolve(false, err.toString());
			});
			return differed.promise;
		}, 
		createCartItem: function(item){

			var differed = $q.defer();

			$http.post('/api/cart/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			});
			return differed.promise;
		},
		updateCartItem: function(item){

			var differed = $q.defer();

			$http.put('/api/cart/', item)
				.then(function(response){
					if(response.data.success){
						differed.resolve(true);
					}else{
						differed.resolve(false);
					}
			}, function(err){
				differed.resolve(false, err.toString());
			});
			return differed.promise;
		}
	};
}])