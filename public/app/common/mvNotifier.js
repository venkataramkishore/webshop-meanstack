angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
	return {
		notify:function name(msg){
			mvToastr.success(msg);
			console.log(msg);
		},
		error:function (msg){
			mvToastr.error(msg);
			console.log(msg);
		}
	}
});