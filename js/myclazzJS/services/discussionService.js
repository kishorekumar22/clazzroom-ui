'use strict';
 
myclazzApp.factory('discussionService', [ '$rootScope','$http', '$q','CONSTANTS', function(rootScope,$http,$q,c){
 
    return {
         
    createDiscussionPost: function(post) {
        return $http.post(c.SAVE_DISCUSSIONS_API, post)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
        getDisscussionPosts: function(post,index) {
         return $http.post(c.GET_DISCUSSIONS_API + index, post)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
 	deleteDisscussionPost: function(post) {
         return $http.post(c.DELETE_DISCUSSION_API, post)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
	createDiscussionComment :  function(id,comment) {
        return $http.post(c.SAVE_DISCUSSION_COMMEMT_API + id, comment)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
	deleteDiscussionComment : function(id,comment) {
        return $http.post(c.DELETE_DISCUSSION_COMMEMT_API + id, comment)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        }
};

}]);
