angular.module('app').controller('mvSignUpCtrl', ['$scope', 'mvAuth', 'mvUser', '$location', 'mvNotifier', function($scope, mvAuth, mvUser, $location, mvNotifier){
	
	$scope.signup = function(){
		var newUserData = {
			userName:$scope.email,
			password:$scope.password,
			firstName:$scope.fname,
			lastName:$scope.lname,
			house:$scope.house,
			street:$scope.street,
			area:$scope.area,
			city:$scope.city,
			state:$scope.state,
			pincode:$scope.pincode
		};

		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function(reason){
			mvNotifier.error(reason);
		})
	}
}])