angular.module('app').controller('mvProfileCtrl', ['$scope', 'mvAuth', 'mvIdentity', 'mvNotifier', '$location',
function($scope, mvAuth, mvIdentity, mvNotifier, $location){
	
$scope.email = "";
$scope.fname = "";
$scope.lname = "";

$scope.house = "";
$scope.street = "";
$scope.area = "";
$scope.city = "";
$scope.state = "";
$scope.pincode= "";

$scope.initalise = function(){
	if(mvIdentity.isAuthenticated()){
		$scope.email = mvIdentity.currentUser.userName;
		$scope.fname = mvIdentity.currentUser.firstName;
		$scope.lname = mvIdentity.currentUser.lastName;

		$scope.house =mvIdentity.currentUser.house;
		$scope.street =mvIdentity.currentUser.street;
		$scope.area =mvIdentity.currentUser.area;
		$scope.city = mvIdentity.currentUser.city;
		$scope.state =mvIdentity.currentUser.state;
		$scope.pincode= mvIdentity.currentUser.pincode;
	}else{
		mvNotifier.error('Please login');
		$location.path("/shopnow");
	}
}
// initialise data from logined user
$scope.initalise();

$scope.update = function(){
	var newUserData = {
		username: $scope.email,
		userName: $scope.email,
		firstName:$scope.fname,
		lastName:$scope.lname,
		house:$scope.house ,
		street:$scope.street,
		area:$scope.area,
		city:$scope.city,
		state:$scope.state,
		pincode:$scope.pincode
	}

	if($scope.password && $scope.password.length > 0 ){
		newUserData.password = $scope.password;
	}
	
	console.log("Update User details : "+ JSON.stringify(newUserData));

	mvAuth.updateCurrentUserData(newUserData).then(function(){
		mvNotifier.notify('User updated successfully...!!');
		if(mvIdentity.isAuthorized('Admin')){
			$location.path("/admin/users");	
		}else if( mvIdentity.isAuthenticated()) {
			$location.path("/shopnow");
		}
		
	}, function(reason){
		mvNotifier.error(reason);
	})
}

}]);