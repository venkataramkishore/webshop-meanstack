angular.module('app').factory('mvIdentity', function($window, mvUser){
	var currentUser;
	if(!!$window.bootstrappedUserObject){
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function(){
			return !!this.currentUser;
		},
		isAuthorized: function(role){
			if(angular.isUndefined(this.currentUser)){
				return false;
			}else 
				return this.currentUser.roles.indexOf(role) > -1;
		}
	}
});