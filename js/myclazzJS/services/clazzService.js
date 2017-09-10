'use strict';
 
myclazzApp.factory('clazzService', [ '$rootScope','$http', '$q','CONSTANTS', function(rootScope,$http,$q,c){
 
    return {
     
    createClazz: function(clazz){
            return $http.post(c.CREATE_CLAZZ, clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },

     addClazzMember: function(clazz){
            return $http.post(c.ADD_CLAZZ_MEMBER, clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },

    removeClazzMember: function(clazz){
            return $http.post(c.REMOVE_CLAZZ_MEMBER, clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },

    getClazzInfo: function(clazz){
            return $http.post(c.GET_CLAZZ_INFO , clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
	addClazzAssignment: function(clazz){
            return $http.post(c.ADD_CLAZZ_ASSIGNMENT , clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
    removeClazzAssignment: function(clazz){
            return $http.post(c.REMOVE_CLAZZ_ASSIGNMENT , clazz)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },

    getClazzAssignments: function(clazz){
            
            return $http.post(c.GET_CLAZZ_ASSIGNMENTS  , clazz)
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
