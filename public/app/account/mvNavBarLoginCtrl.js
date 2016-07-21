angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', 'mvAuth','mvNotifier','mvIdentity','$location', mvNavBarLoginCtrl_fun]);

function mvNavBarLoginCtrl_fun($scope, mvAuth, mvNotifier, mvIdentity, $location){
	$scope.identity=mvIdentity;

	$scope.signin = function(username, password){
		console.log('Almost validate..');
		
		var differedObj = mvAuth.authenticateUser(username, password);

		differedObj.then(function(success){
			if(success){
					console.log("Login Successfull");
					mvNotifier.notify('You have successfully signed in.!!');
				}else{
					console.log("Login Failure");
					mvNotifier.notify('Your username/password are incorrect..!');
				}
		});

	};
	
	$scope.signout = function(){
	
		var promise = mvAuth.logoutUser().then(function(){
			$scope.username="";
			$scope.password="";
			mvNotifier.notify('You have Successfully Logged out!');
			$location.path('/');
		});
	}
}