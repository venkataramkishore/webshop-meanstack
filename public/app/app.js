angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	
	var routeRoleChecks= {
		admin: {
			auth:function(mvAuth){
				return mvAuth.authorizedCurrentUserRoute('Admin');
			}
		},
		user: {
			auth:function(mvAuth){
				var isAuth = mvAuth.authorizedAuthenticatedUserRoute();
				console.log("Is authenticated..! "+isAuth);
				return isAuth;
			}
		}
	};

	$locationProvider.html5Mode({enabled: true});

	$routeProvider.
		when('/', {
			templateUrl:'/partials/main/main',
			controller:'mvMainCtrl'
		}).
		when('/signup', {
			templateUrl:'/partials/account/signup',
			controller:'mvSignUpCtrl'
		}).
		when('/profile', {
			templateUrl:'/partials/account/profile',
			controller:'mvProfileCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/courses', {
			templateUrl:'/partials/courses/course-list',
			controller:'mvCourseListCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/courses/:id', {
			templateUrl:'/partials/courses/course-details',
			controller:'mvCourseDetailCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/shopnow', {
			templateUrl:'/partials/shopnow/shopnow',
			controller:'mvShopNowCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/admin/setup', {
			templateUrl:'/partials/shopnow/setup-page',
			controller:'mvSetupCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/myorders', {
			templateUrl:'/partials/admin/order-list',
			controller:'mvOrderCtrl',
			resolve: routeRoleChecks.user
		}).
		when('/clientorders', {
			templateUrl:'/partials/admin/client-order-list',
			controller:'mvOrderCtrl',
			resolve: routeRoleChecks.admin
		}).
		when('/admin/users', {
			templateUrl:'/partials/admin/user-list',
			controller:'mvUserListCtrl', resolve: routeRoleChecks.admin
		});
});

angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'Not Authorized'){
			$location.path('/');
		}
	})
});