angular.module('app').controller('mvCourseDetailCtrl', ['$scope', 'mvCourse', '$routeParams', courseDetail_fn]);


function courseDetail_fn($scope, mvCourse, $routeParams ){
	$scope.course = mvCourse.get({_id:$routeParams.id});
}