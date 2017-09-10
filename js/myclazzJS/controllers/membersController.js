'use strict';
myclazzApp.controller('membersController', function($scope,$rootScope,clazzService) {
	$rootScope.hideNavBar = false;
	$scope.newClazzName ="";
	$scope.emailOfNewMember ="";
	
	$scope.addMember = function(){
		var memuser= {"emailId":$scope.emailOfNewMember ,"clazzName":$rootScope.user.clazzName};
		$rootScope.isLoading = true;
		clazzService.addClazzMember(memuser)
		.then(
			function(d) {
				if(d.response.code == 'MC_0016'){
					$rootScope.clazz= d.data;
					$scope.emailOfNewMember ="";
				}
				$rootScope.notify(d.response.message);
			},
			function(errResponse){
				console.error('Error while adding Member to the clazz');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	};
	$scope.removeMember = function(member){
		var memuser= {"emailId":member.emailId ,"clazzName":$rootScope.user.clazzName};
		$rootScope.isLoading = true;
		clazzService.removeClazzMember(memuser)
		.then(
			function(d) {
				if(d.response.code == 'MC_0019'){
					$rootScope.clazz= d.data;
				}
				$rootScope.notify(d.response.message);
			},
			function(errResponse){
				console.error('Error while adding Member to the clazz');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	};

	$scope.createClazz = function(){
		var memuser= {"name":$rootScope.user.name ,"emailId":$rootScope.user.emailId ,"clazzName":$scope.newClazzName};
		$rootScope.isLoading = true;
		clazzService.createClazz(memuser)
		.then(
			function(d) {
				if(d.response.code == 'MC_0012'){
					$rootScope.user= d.data;
				}else{
					$rootScope.notify(d.response.message);
				}
			},
			function(errResponse){
				console.error('Error while creating the clazz');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	};

	$scope.getClazz = function(){
		
			var clazz= {"clazzName":$rootScope.user.clazzName};
			$rootScope.isLoading = true;
			clazzService.getClazzInfo(clazz)
			.then(
				function(d) {
					if(d.response.code == 'MC_0024'){
						$rootScope.clazz= d.data;
					}else{
						$rootScope.notify(d.response.message);
					}
				},
				function(errResponse){
					console.error('Error while retrieving the clazz');
				}).finally(function(){
        $rootScope.isLoading = false;
        });     
		
	}
});
