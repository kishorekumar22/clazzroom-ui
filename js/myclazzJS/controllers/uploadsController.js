'use strict';
myclazzApp.controller('uploadsController', function($scope,$rootScope,CONSTANTS,uploadService) {
	$scope.documents =[];
    $scope.uploadCount = CONSTANTS.MAX_UPLOAD_COUNT;
    $scope.student=JSON.parse(JSON.stringify($rootScope.user));
    delete $scope.student.profileImage;
    $scope.uploadDocument = function(){
        var max_size = CONSTANTS.MAX_UPLOAD_SIZE /(1000000);
        var imageFile;
        if($scope.files.length > 1){
            $rootScope.notify ("Please upload files one after other");
            $scope.files=[];return;  
        }
        if($scope.files[0].size >= CONSTANTS.MAX_UPLOAD_SIZE){
        	$rootScope.notify ("Exceeding max file size of "+ max_size +"MB : "+($scope.files[0].name));
        }
        else{
            imageFile = $scope.files[0];
    	}
        //constructing payload wiht image
      var payload = new FormData();
        payload.append('student', new Blob([angular.toJson($scope.student)], {
            type: "application/json"
        }));
        if($scope.files != undefined){
          payload.append("document",imageFile);
      }
      $rootScope.isLoading = true;
      //Actual update call
    uploadService.uploadDocument(payload)
    .then(
     function(d) {
        $scope.documents= d.data;
        $rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while uploading Document');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
  };
$scope.deleteDocument = function(document){
    $rootScope.isLoading = true;
        uploadService.deleteUploadedDocument(document)
        .then(
            function(d) {
                if(d.response.code == 'MC_0035'){
                    $scope.documents= d.data;
                }else{
                    $rootScope.notify(d.response.message);
                }
            },
            function(errResponse){
              console.error('Error while deleting uploaded document');
            }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };
    $scope.downloadDocument = function(documentMetaData){
        var dataPromise = uploadService.downloadUploadedDocument(documentMetaData);
        dataPromise .then(
            function(d) {
                if(d.response.code == 'MC_0038'){
                        var binaryString = window.atob(d.data.file);
                        var bytes = new Uint8Array(binaryString.length);
                        for (var i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                       var blob = new Blob([bytes], { type: d.data.metaData.fileType });
                          var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                            if (urlCreator) {
                                var url = urlCreator.createObjectURL(blob);
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.style = "display: none";
                                a.href = url;
                                a.download = d.data.metaData.fileName; 
                                a.click();
                                window.URL.revokeObjectURL(url);
                            }
                }else{
                    $rootScope.notify(d.response.message);
                }
            },
            function(errResponse){
              console.error('Error while downloading uploaded documents');
              $rootScope.notify("Error while downloading uploaded document");
            });
    };
    $scope.getDocuments = function(){
        $rootScope.isLoading = true;
        uploadService.getUploadedDocuments($scope.student)
        .then(
            function(d) {
                if(d.response.code == 'MC_0034'){
                    $scope.documents= d.data;
                }else{
                    $rootScope.notify(d.response.message);
                }
            },
            function(errResponse){
                console.error('Error while retrieving uploaded documents');
            }).finally(function(){
        $rootScope.isLoading = false;
        });      
    };
});
