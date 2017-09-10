'use strict';
myclazzApp.controller('loginController', function($scope,$rootScope,$location,studentService,clazzService,CONSTANTS,utilityService) {
  $scope.registerFlag = false;
  $scope.currentDate = new Date();
  $scope.user ={};

   $scope.authenticate = function(){

    var data = 'username=' + encodeURIComponent($scope.user.emailId) +
        '&password=' + encodeURIComponent($scope.user.password) +
        '&submit=Login';


    studentService.performLogin(data)
    .then(
     function(d) {
      if(d.response.code == 'MC_0000' && d.data.clazzName != null){
       $rootScope.user = d.data;
       var clazz = {"clazzName":d.data.clazzName};
       clazzService.getClazzAssignments(clazz)
      .then(
      function(r) {
        if(r.response.code == 'MC_0024'){
          $rootScope.clazz= r.data;
        }
      },
      function(errResponse){
        console.error('Error while fetching assignmrnts of the clazz');
      }); 
      $location.path("/discussions");
      }
      else if(d.response.code == 'MC_0011'){
        $rootScope.user=d.data;
       $location.path("/members");
      }else{
        $rootScope.notify(d.response.message);
        $location.path("/");
      }
    },
    function(errResponse){
      console.error('Error while Logging in');
      $rootScope.notify("Backend down,Please check!");
      $location.path("/");
    });     
  };

  $scope.register = function(){

    //Validation 
    $scope.errorMsg = "";
    var msg = utilityService.validateNewUser($scope.newuser);
    if(msg != "VALID"){
      $scope.errorMsg = msg;
      return;
    }
    //post validation
    var imageFile;
      if($scope.files != undefined){
        if($scope.files[0].size >= CONSTANTS.MAX_UPLOAD_SIZE){
            $rootScope.notify ("Exceeding max file size of 5 MB : "+($scope.files[0].name));
            return;
          }else{
           imageFile = $scope.files[0];
        }
      }
      //constructing payload wiht image
      var payload = new FormData();
        payload.append('student', new Blob([angular.toJson($scope.newuser)], {
            type: "application/json"
        }));
        if($scope.files != undefined){
          payload.append("profileImage",imageFile);
      }
      $rootScope.isLoading = true;
    studentService.createStudent(payload)
    .then(
     function(d) {
      if(d.response.code == 'MC_0004'){
       $location.path("/");
       $rootScope.notify(d.response.message);
       $scope.registerFlag = false;
      }
      else{
        $rootScope.notify(d.response.message);
        $location.path("/");
      }
    },
    function(errResponse){
      console.error('Error while signing in');
      $location.path("/");
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
  };

});
