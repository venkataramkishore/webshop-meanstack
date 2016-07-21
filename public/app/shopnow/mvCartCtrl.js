angular.module('app').controller('mvCartCtrl', ['$scope', '$rootScope', cartCtrl_fn]);

function cartCtrl_fn($scope, $rootScope){


	$scope.cartItems = [];
	$scope.cartFilter="";
	$scope.totalOfAllItems = 0;

	$rootScope.$on('ShowCartItemsEvent', function(event, args){
		$scope.cartItems = args;
	});

	$scope.updateCartItem = function(item, quantity){
		if(!isNaN(quantity) && quantity > 0 ){
			for(var i=0; i<quantity; i++){
				item.totalPrice= item.price + item.totalPrice;
			}
		}
		//update same in total also
		if($scope.cartItems.length > 0 ){
			for (var item in $scope.cartItems){
				$scope.totalOfAllItems= item.totalPrice+$scope.totalOfAllItems;
			}
		}
		
	}	


}
