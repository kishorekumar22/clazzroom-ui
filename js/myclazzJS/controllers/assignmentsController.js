'use strict';
myclazzApp.controller('assignmentsController', function($scope,$rootScope,clazzService) {
	$scope.newAssignment = {};
	$scope.currentDate = new Date();
	$scope.getAssignments = function(){
		var clazz= {"clazzName":$rootScope.user.clazzName};
		$rootScope.isLoading = true;
		clazzService.getClazzAssignments(clazz)
		.then(
			function(d) {
				if(d.response.code == 'MC_0024'){
					$rootScope.clazz= d.data;
				}
			},
			function(errResponse){
				console.error('Error while fetching assignments for the clazz');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	};
    $scope.createAssignment = function(){
		var clazz= {"clazzName":$rootScope.user.clazzName,"assignments" :[]};
		$scope.newAssignment.author = $rootScope.user.name;
		$scope.newAssignment.authorEmailId = $rootScope.user.emailId;
		clazz.assignments.push($scope.newAssignment);
		$rootScope.isLoading = true;
		clazzService.addClazzAssignment(clazz)
		.then(
			function(d) {
				if(d.response.code == 'MC_0025'){
					$rootScope.clazz= d.data;
					$scope.newAssignment = {};
				}
				$rootScope.notify(d.response.message);
			},
			function(errResponse){
				console.error('Error while creating assignments');
			}).finally(function(){
        $rootScope.isLoading = false;
        });     
	};
	$scope.deleteAssignment = function(assignment){
		var clazz= {"clazzName":$rootScope.user.clazzName,"assignments" :[]};
		clazz.assignments.push(assignment);
		$rootScope.isLoading = true;
		clazzService.removeClazzAssignment(clazz)
		.then(
			function(d) {
				if(d.response.code == 'MC_0027'){
					$rootScope.clazz= d.data;
				}
				$rootScope.notify(d.response.message);
			},
			function(errResponse){
				console.error('Error while deleting assignment');
			}).finally(function(){
        		$rootScope.isLoading = false;
        	});      
		$rootScope.isLoading = false;
	};
});

