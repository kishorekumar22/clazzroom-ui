'use strict';
myclazzApp.controller('profileController', function($scope,$rootScope,studentService,CONSTANTS,utilityService) {
    $scope.updateVisibilityFlag = false;
    $scope.currentDate = new Date();
    $scope.student=JSON.parse(JSON.stringify($rootScope.user));
    $scope.updateProfile = function(){
      //Validation 
    $scope.errorMsg = "";
    var msg = utilityService.validateNewUser($scope.student);
    if(msg != "VALID"){
      $scope.errorMsg = msg;
      return;
    }
    //Post validation
      var imageFile;
      if($scope.files != undefined){
        if($scope.files[0].size >= CONSTANTS.MAX_IMAGE_SIZE ){
            $rootScope.notify ("Exceeding max Image size of "+CONSTANTS.MAX_IMAGE_SIZE /(1000000)+" MB : "+($scope.files[0].name));
            $scope.student=JSON.parse(JSON.stringify($rootScope.user));
            return;
          }else{
           imageFile = $scope.files[0];
        }
      }
      //constructing payload wiht image
      var payload = new FormData();
        payload.append('student', new Blob([angular.toJson($scope.student)], {
            type: "application/json"
        }));
        if($scope.files != undefined){
          payload.append("profileImage",imageFile);
      }
      $rootScope.isLoading = true;
      //Actual update call
    studentService.updateStudent(payload)
    .then(
     function(d) {
      if(d.response.code == 'MC_0008'){
        $rootScope.user = d.data;
        $scope.updateVisibilityFlag = false
      }
      $rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while updating the profile');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
  };

  $scope.editProfile = function(){
    $scope.student=JSON.parse(JSON.stringify($rootScope.user));
    $scope.updateVisibilityFlag = true;
  }
});