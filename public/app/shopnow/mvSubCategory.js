angular.module('app').factory('mvSubCategory', ['$resource', subCategoryResource_Fn]);

function subCategoryResource_Fn($resource){

	var SubCategoryResource = $resource('/api/subcategory/:title', {catTitle:"@title"}, {
		update:{
			method: 'PUT',
			isArray:false
		},
		delete:{
			method: 'DELETE',
			isArray:false
		}
	});

	return SubCategoryResource;
}