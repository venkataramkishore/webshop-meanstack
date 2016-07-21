angular.module('app').controller('mvCourseListCtrl', ['$scope', 'mvCachedCourses', function($scope, mvCachedCourses){
	
	$scope.courses = mvCachedCourses.query();
	$scope.sortOptions = [{value:"title", text:"Sort by Title"},
		{value:"published", text:"Sort by Published"}];
	$scope.sortOrder = $scope.sortOptions[0].value;
}])