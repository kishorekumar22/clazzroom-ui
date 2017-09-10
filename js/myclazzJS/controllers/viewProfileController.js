'use strict';
myclazzApp.controller('viewProfileController', function($scope,$rootScope,studentService,$routeParams) {
	$scope.userProfile = {};
	$scope.getUserProfile = function(){
		var student= {"emailId":$routeParams.emailId,"clazzName":$rootScope.user.clazzName};
		$rootScope.isLoading = true;
		studentService.fetchStudent(student)
		.then(
			function(d) {
				if(d.response.code == 'MC_0000'){
					$scope.userProfile= d.data;
				}else{
					$rootScope.notify(d.response.message); s
				}
			},
			function(errResponse){
				console.error('Error while fetching student info for the clazz');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	}; 
});