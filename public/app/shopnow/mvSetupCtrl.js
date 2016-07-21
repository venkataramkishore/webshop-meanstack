/**
*  Module
*
* Description
*/
angular.module('app').controller('mvSetupCtrl', ['$scope', 'mvCategory','mvSubCategory','mvProduct', 'mvSetupServices', 'mvNotifier', 
	function($scope,mvCategory,mvSubCategory,mvProduct, mvSetupServices, mvNotifier){
	
	$scope.pageToLoad = "/partials/shopnow/category-list-admin";
	$scope.adminCategories = [];
	$scope.adminSubCategories = [];
	$scope.adminProducts = [];
	$scope.choice=1;

	$scope.opr="";
	$scope.category = {
		title:"",
		description:""
	};

	$scope.subcategory={
		title:"",
		category_title:"",
		description:""
	};

	$scope.product={
		title:"",
		description:"",
		category:"",
		subCategory:"",
		available:"",
		sold:"",
		price:""
	};

	function toCamelCase(str) {
	  // Lower cases the string
	  return str.toLowerCase()
	    // Replaces any - or _ characters with a space 
	    .replace( /[-_]+/g, ' ')
	    // Removes any non alphanumeric characters 
	    .replace( /[^\w\s]/g, '')
	    // Uppercases the first character in each group immediately following a space 
	    // (delimited by spaces) 
	    .replace( / (.)/g, function($1) { return $1.toUpperCase(); });
	    // Removes spaces 
	    //.replace( / /g, '' );
	}

	$scope.optionList = function(optObj){
		var options = [];
		
		for (prop in optObj){
			options.push({name:prop.toUpperCase(), value:prop+""});
		}

		return options;
	};

	$scope.clearProdData = function(){
			$scope.product._id="";
			$scope.product.title="";
			$scope.product.description ="";
			$scope.product.category="";
			$scope.product.imgUrl="";
			$scope.product.subCategory="";
			$scope.product.available=0;
			$scope.product.sold=0;
			$scope.product.price=0;
		};

	$scope.clearCatData = function(){
			$scope.category._id="";
			$scope.category.title="";
			$scope.category.description="";
		};

	$scope.clearSubCatData = function(){
			$scope.subcategory._id="";
			$scope.subcategory.title="";
			$scope.subcategory.category_title="";
			$scope.subcategory.description="";
		};


	$scope.switchTo = function(context, updateFlag){
		$scope.choice = parseInt(context);
		updateFlag =updateFlag || false;
		$scope.opr="Edit";

		switch($scope.choice){
			case 1:
					$scope.pageToLoad="/partials/shopnow/category-list-admin";
					$scope.fetchAllCategories();
				break;
			case 2:
					$scope.pageToLoad="/partials/shopnow/sub-category-list-admin";
					$scope.fetchAllSubCategories();
				break;
			case 3:
					$scope.pageToLoad="/partials/shopnow/product-list-admin";
					$scope.fetchAllProducts();
				break;
			case 4:
					if(!updateFlag){
						$scope.clearCatData();
						$scope.opr="Create";
					}
					$scope.pageToLoad="/partials/shopnow/create-category";
					break;
			case 5:
					if(!updateFlag){
						$scope.clearSubCatData();
						$scope.opr="Create";
					}
					$scope.pageToLoad="/partials/shopnow/create-sub-category";
					
					break;
			case 6:
					if(!updateFlag){
						$scope.clearProdData();
						$scope.opr="Create";
					}
					$scope.pageToLoad="/partials/shopnow/create-product";
					
					break;
			default:

		}
	}

	$scope.createCategory = function(){

		if($scope.opr==="Edit"){
			mvSetupServices.updateCategory($scope.category).then(function(){
				mvNotifier.notify('Category is updated successfully..!');
				$scope.clearCatData();
				$scope.switchTo(1);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});
		}else{
			if($scope.category.hasOwnProperty("_id")){
				delete $scope.category._id;
			}
			mvSetupServices.createCategory($scope.category).then(function(){
				mvNotifier.notify('Category is saved successfully..!');
				$scope.clearCatData();
				$scope.switchTo(1);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});	
		}
		
	}

	$scope.createSubCategory = function(){
		if($scope.opr==='Edit'){
			mvSetupServices.updateSubCategory($scope.subcategory).then(function(){
				mvNotifier.notify('Sub Category is updated successfully..!');
				$scope.clearSubCatData();
				$scope.switchTo(2);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});
		}else{
			if($scope.subcategory.hasOwnProperty("_id")){
				delete $scope.subcategory._id;
			}
			mvSetupServices.createSubCategory($scope.subcategory).then(function(){
				mvNotifier.notify('Sub Category is saved successfully..!');
				$scope.clearSubCatData();
				$scope.switchTo(2);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});	
		}
		
	}

	$scope.createProduct = function(){
		if($scope.opr==='Edit'){
			mvSetupServices.updateProduct($scope.product).then(function(){
				mvNotifier.notify('Product is updated successfully..!');
				$scope.clearProdData();
				$scope.switchTo(3);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});
		}else{
			if($scope.product.hasOwnProperty("_id")){
				delete $scope.product._id;
			}
			mvSetupServices.createProduct($scope.product).then(function(){
				mvNotifier.notify('Product is saved successfully..!');
				$scope.clearProdData();
				$scope.switchTo(3);
			}, function(err){
				mvNotifier.notify('ERROR ::' + err.toString());
			});	
		}
		
	}

	$scope.fetchAllCategories = function(){
		mvCategory.query().$promise.then(function(response){
			$scope.adminCategories = response;
		}, function(err){
			mvNotifier.error("Unable to fetch Categories..!");
		});
	}

	$scope.deleteCat = function(cat){
		mvCategory.delete({title:cat._id}).$promise.then(function(response){
			$scope.adminCategories = mvCategory.query();
			mvNotifier.notify('Successfully category deleted..!');
		}, function(err){
			mvNotifier.notify('ERROR ::' + err.toString());
		});
//		$scope.adminCategories = mvCategory.query();
	}

	$scope.fetchAllSubCategories = function(){
		mvSubCategory.query().$promise.then(function(response){
			$scope.adminSubCategories = response;
		}, function(err){
			mvNotifier.error("Unable to fetch Sub Categories..!");
		});
	}

	$scope.deleteSubCat = function(cat){
		mvSubCategory.delete({title:cat._id}).$promise.then(function(response){
			$scope.adminSubCategories = mvSubCategory.query();
			mvNotifier.notify('Successfully deleted..!');
		}, function(err){
			mvNotifier.notify('ERROR ::' + err.toString());
		});
	}

	$scope.fetchAllProducts = function(){
		mvProduct.query().$promise.then(function(response){
			$scope.adminProducts = response;
		}, function(err){
			mvNotifier.error("Unable to fetch Products..!");
		});
	}

	$scope.deleteProd = function(cat){
		mvProduct.delete({id:cat._id}).$promise.then(function(response){
			$scope.adminProducts = mvProduct.query();
			mvNotifier.notify('Successfully deleted..!');
		}, function(err){
			mvNotifier.notify('ERROR ::' + err.toString());
		});
	}

	$scope.updateCat = function(cat){
		$scope.clearCatData();

		$scope.category._id=cat._id;
		$scope.category.title=cat.title;
		$scope.category.description=cat.description;

		$scope.switchTo('4', true);

	}

	$scope.updateSubCat = function(subcat){
		$scope.clearSubCatData();

		$scope.subcategory._id=subcat._id;
		$scope.subcategory.title=subcat.title;
		$scope.subcategory.category_title=subcat.category_title;
		$scope.subcategory.description=subcat.description;

		$scope.switchTo('5', true);

	}

	$scope.updateProd = function(prod){
		$scope.clearProdData();

		$scope.product._id=prod._id;
		$scope.product.title=prod.title;
		$scope.product.description=prod.description;
		$scope.product.imgUrl=prod.imgUrl;
		$scope.product.category=prod.category;
		$scope.product.subCategory=prod.subCategory;
		$scope.product.available=prod.available;
		$scope.product.sold=prod.sold;
		$scope.product.price=prod.price;

		$scope.switchTo('6', true);
	}

	//Default fetch data
	$scope.fetchAllCategories();
	$scope.fetchAllSubCategories();
	$scope.fetchAllProducts(); 

}])