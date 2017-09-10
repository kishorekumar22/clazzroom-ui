'use strict';
var myclazzApp = angular.module('myclazzApp', ['ngRoute']);

//Global parameters used through out the portal
myclazzApp.run(function($rootScope,$timeout,studentService,$location,$q,$http) {
    $rootScope.user = {};
    $rootScope.alert = {};
    $rootScope.clazz = {};

    $rootScope.isLoading = false;
    $rootScope.notify = function(message){
        $rootScope.alert.message = message;
        $timeout(function() {$rootScope.alert ={};}, 4000);
    };

    $rootScope.logout = function(){
         $rootScope.user = {};
         studentService.logout();
         $location.path("/");
    };

    studentService.getLoggedInUser().then(function(d) {
            $rootScope.user= d.data;    
            },
            function(errResponse){
                //$rootScope.notify("Please login to proceed!")
                $location.path("/");
            }).finally(function(){
        $rootScope.isLoading = false;
        
        });
});

//Routing code - URL based routing
myclazzApp.config(function($routeProvider,$httpProvider) {

    //Routing Config
    $routeProvider
    .when('/', {
        templateUrl : 'login.html',
        controller  : 'loginController'
    })
    .when('/discussions', {
        templateUrl : 'discussions.html',
        controller  : 'discussionsController'
    })
    .when('/profile', {
        templateUrl : 'profile.html',
        controller  : 'profileController'
    })
    .when('/assignments', {
        templateUrl : 'assignments.html',
        controller  : 'assignmentsController'
    })
    .when('/schedule', {
        templateUrl : 'schedule.html',
        controller  : 'scheduleController'
    })
    .when('/uploads', {
        templateUrl : 'uploads.html',
        controller  : 'uploadsController'

    })
    .when("/viewProfile:emailId", {
            templateUrl: 'viewProfile.html',
            controller  : 'viewProfileController'
        })
    .when('/members', {
        templateUrl : 'members.html',
        controller  : 'membersController'
    }).otherwise({redirectTo: '/discussions'})

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
});









