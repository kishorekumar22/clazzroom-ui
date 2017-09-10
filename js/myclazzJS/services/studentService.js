'use strict';
 
myclazzApp.factory('studentService', [ '$rootScope','$http', '$q','CONSTANTS', function(rootScope,$http,$q,c){
 
    return {
         
    fetchStudentByEmail: function(user) {
        return $http.post(c.GET_USER_API, user)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
        getLoggedInUser: function() {
        return $http.get(c.GET_LOGGEDIN_STUDENT_URL)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
        logout: function() {
        return $http.post(c.LOGOUT_URL,{})
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
        
        fetchStudent: function(user) {
        return $http.post(c.GET_STUDENT_INFO, user)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
            );
        },
     
    createStudent: function(payload){
            return $http.post(c.CREATE_USER, payload, {
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
     
    updateStudent: function(payload){
            return $http.post(c.UPDATE_USER, payload, {
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

    performLogin: function(user,headers){

            return $http.post(c.LOGIN_API, user ,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
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
