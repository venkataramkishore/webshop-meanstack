angular.module('app').controller('mvMainCtrl', ['$scope', 'mvCachedCourses', mainController]);

function mainController($scope, mvCachedCourses){
	$scope.courses = mvCachedCourses.query();

}