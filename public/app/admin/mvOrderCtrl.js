angular.module('app').controller('mvOrderCtrl', ['$scope', '$location', 'mvOrder', 'mvNotifier', 'mvIdentity', 
	function ($scope, $location, mvOrder, mvNotifier, mvIdentity) {
	
	$scope.orders = [];
	$scope.myOrders = [];
	$scope.cliOrdFilter="";
	$scope.ordFilter="";
	$scope.status=["InProgress","Delivered","Cancelled"];
	$scope.ord={};
	$scope.editOrder=false;

	$scope.getMyOrders = function(){

		if(mvIdentity.isAuthorized('Admin')){
			mvOrder.query().$promise.then(function(response){
				$scope.orders = response;
			}, function(){
				mvNotifier.error('Unable to fetch orders');
			});
		}else if( mvIdentity.isAuthenticated()) {
			var emailId = mvIdentity.currentUser.userName;
			mvOrder.query({email:emailId}).$promise.then(function(response){
				// this would clear array
				$scope.orders.length=0;

				$scope.orders = response;
			}, function(){
				mvNotifier.error('Unable to fetch your orders');
			});
		}else{
			mvNotifier.error('Please login to view your orders.');
			$location.path("/shopnow");
		}
	}

	$scope.getMyOrders();

	$scope.cancelOrder=function(order){

		if( mvIdentity.isAuthenticated() ) {
			order.modifiedBy=mvIdentity.currentUser.userName;
			order.status="Cancelled";
			order.mod_time= new Date().getTime();

			mvOrder.update(order).$promise.then(function(response){
				mvNotifier.notify('Order has been Cancelled successfully..!');
				$scope.getMyOrders();
			}, function(err){
				mvNotifier.error('Unable to delete order.'+ JSON.stringify(err));
			});
		}
	}

	$scope.modifyOrder = function( order ){
		$scope.ord = order;
		$scope.editOrder = true;
	}

	$scope.updateOrder = function(order){
		
		if( mvIdentity.isAuthenticated() ) {
			order.modifiedBy=mvIdentity.currentUser.userName;
			order.mod_time= new Date().getTime();

			mvOrder.update(order).$promise.then(function(response){
				mvNotifier.notify('Order has been updated successfully..!');
				$scope.ord = {};
				$scope.editOrder = false;
			}, function(err){
				mvNotifier.error('Unable to delete order.');
			});
		}
	}

}])