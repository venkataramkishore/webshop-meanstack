angular.module('app').controller('mvUserListCtrl', ['$scope','$location','mvNotifier','mvIdentity', 'mvUser', 
	function($scope, $location, mvNotifier, mvIdentity, mvUser){
	
	$scope.userFilter="";
	$scope.users = [];

	if(mvIdentity.isAuthorized('Admin')){
		$scope.users = mvUser.query();
	}else{
		$location.path("/shopnow");
		mvNotifier.error("Please login as admin.");
	}
	
}]);