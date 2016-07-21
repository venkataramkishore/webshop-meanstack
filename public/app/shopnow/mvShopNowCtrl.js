/**
*  Module
*
* Description
*/
angular.module('app').controller('mvShopNowCtrl', ['$scope', 'mvSetupServices', 'mvCategory', 'mvSubCategory', 'mvProduct', 'mvNotifier', 'mvIdentity', shopNowCtrl_Fn]);

function shopNowCtrl_Fn($scope, mvSetupServices, mvCategory, mvSubCategory, mvProduct, mvNotifier, mvIdentity){

	$scope.categories= mvCategory.query();
	$scope.currentShop = {catTitle:"", subcatTitle:""};
	$scope.currentUser = mvIdentity.currentUser;	
	$scope.subCategories = []; 
	$scope.productList = mvProduct.query();

	$scope.showShop=true;
	$scope.isProcessOrder = false;

	$scope.cartItems = [];
	$scope.cartItemsCnt = $scope.cartItems.length;
	$scope.totalOfAllItems = 0;

	 $scope.getSubCategories= function(catData){
	 	var cat_title = catData.title || '';
	 	if(cat_title && cat_title.length > 0){
	 		$scope.currentShop.catTitle = cat_title;
	 		$scope.subCategories=[];

			mvSubCategory.query({title:cat_title}).$promise.then(function(response){
				console.log("Sub Category Response :: "+JSON.stringify(response, null, 2));

				if(response.length >0){
					$scope.subCategories = response;
				}else{
					mvNotifier.notify('Please setup Sub Category for '+cat_title);
				}
			});
	 	}
	 }

	 $scope.fetchProducts = function(subCatData){

	 	var subcat_title = subCatData.title || '';
	 	if(!$scope.currentShop.catTitle){
	 		$scope.currentShop.catTitle = $scope.categories[0].title;
	 	}
	 	if(subcat_title && subcat_title.length > 0){
	 		$scope.currentShop.subcatTitle = subcat_title;
			mvProduct.query($scope.currentShop).$promise.then(function(response){
				$scope.productList = response;
				console.log("Product Response : " + JSON.stringify(response));
				if($scope.productList.length ==0){
					mvNotifier.notify('Yet to configure products for the selection criteria.');
				}
			}, function(err){
				mvNotifier.notify('Error: ' + err.toString());
			});
	 	}
	 }

	 $scope.add2Cart = function(prodItem){
	 	
	 	var found = false;
			if($scope.cartItems.length > 0){

				for(item in $scope.cartItems){
					if($scope.cartItems[item]._id == prodItem._id){
						found = true;
						mvNotifier.error(prodItem.title+' is already added to cart.');
					}
				}
			}
		if(!found){
			prodItem.totalPrice = prodItem.price;
			prodItem.reqQuantity=1;
			$scope.cartItems.push(prodItem);
			$scope.cartItemsCnt = $scope.cartItems.length;		
			$scope.totalOfAllItems= prodItem.totalPrice+$scope.totalOfAllItems;
			mvNotifier.notify(prodItem.title+' is added to cart.');
		}
	 }

	 $scope.calculateTotalPrice = function(item){
	 	
	 	if($scope.cartItems.length > 0 ){
			for (var index in $scope.cartItems){
				var orderItem = $scope.cartItems[index];
				if(item.title == orderItem.title){
					
					if(orderItem.hasOwnProperty('reqQuantity') && orderItem.reqQuantity > 0){
						//reset to default because of re calculation of total quantity
						$scope.totalOfAllItems= $scope.totalOfAllItems- orderItem.totalPrice;
						orderItem.totalPrice=0;
						for (var i=0;i< orderItem.reqQuantity; i++){
							orderItem.totalPrice= orderItem.totalPrice+orderItem.price;
						}
						$scope.totalOfAllItems= orderItem.totalPrice+$scope.totalOfAllItems;
					}else{
						$scope.totalOfAllItems= $scope.totalOfAllItems - orderItem.totalPrice;
						$scope.cartItems.splice(orderItem, 1);
					}
				}
				
			}
		}
	 }

	 $scope.showCartItemsView = function(){
	 	$scope.showShop = false;
	 	$scope.isProcessOrder = false;
	 }

	 $scope.processMyOrder = function(){
	 	
	 	if(!mvIdentity.isAuthenticated()){
	 		mvNotifier.error('Please login to process your order.');
	 	}else{
	 		$scope.isProcessOrder = true;
	 		$scope.currentUser = mvIdentity.currentUser;
	 	}
	 }

	 $scope.backToShop = function(){

	 	$scope.showShop=true;
	 	$scope.isProcessOrder = false;
	 }

	 $scope.removeFromCart = function(item){
	 	
	 	$scope.totalOfAllItems= $scope.totalOfAllItems - item.totalPrice;
	 	var index = $scope.cartItems.indexOf(item);
	 	
	 	$scope.cartItems.splice(index, 1);
	 	$scope.cartItemsCnt = $scope.cartItems.length;
	 }

	 $scope.confirmMyOrder = function(){
	 	//var error = false;
	 	if($scope.cartItems.length > 0 ){
	 		for (var i=0;i<$scope.cartItems.length;i++)	{
	 			var cart = $scope.cartItems[i];

	 			var addToCartItem = {
				 		userName: $scope.currentUser.userName,
				 		firstName: $scope.currentUser.firstName,
				 		lastName: $scope.currentUser.lastName,
				 		totalPrice: cart.totalPrice,
				 		prod_title: cart.title,
				 		quantity: cart.reqQuantity,
				 		category: cart.category,
				 		subCategory:cart.subCategory,
				 		status:"InProgress",
				 		ord_time:new Date().getTime()
				 	};

				 	mvSetupServices.createCartItem(addToCartItem).then(function(){
					//error = false;	
					}, function(err){
						//error = true;
					});	
	 		}//End of for
	 		
	 		mvNotifier.notify('Your order is in placed and InProgress with owner');
	 		
	 		//All r saved so clear now.
	 		$scope.cartItems = [];
			$scope.cartItemsCnt = $scope.cartItems.length;
	 		$scope.backToShop();
	 	}
	 }
}