'use strict';
 
myclazzApp.factory('uploadService', [ '$rootScope','$http', '$q','CONSTANTS', function(rootScope,$http,$q,c){
 
    return {
         
    uploadDocument: function(payload) {
        return $http.post(c.UPLOAD_DOCUMENT, payload,{
                transformRequest : angular.identity,
                headers : {
                'Content-Type' : undefined
                }})
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
    getUploadedDocuments: function(payload) {
        return $http.post(c.GET_UPLOADED_DOCUMENTS, payload)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
    downloadUploadedDocument: function(payload) {
        return $http.post(c.DOWNLOAD_UPLOADED_DOCUMENTS, payload)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
    deleteUploadedDocument: function(payload) {
        return $http.post(c.DELETE_UPLOADED_DOCUMENTS, payload)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        }
    }
}]);