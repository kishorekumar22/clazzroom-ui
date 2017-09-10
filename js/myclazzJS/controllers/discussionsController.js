'use strict';
myclazzApp.controller('discussionsController', function($scope,$rootScope,discussionService) {
	$scope.discussions= [];
    $scope.postDiscussion = function(){
        var discussionPost = {"content" : $scope.discussionText , "author" : $rootScope.user.name , "authorEmailId" : $rootScope.user.emailId ,"clazzName":$rootScope.user.clazzName};

       discussionService.createDiscussionPost(discussionPost)
    .then(
     function(d) {
     	$scope.discussionText = "";
        $scope.discussions= d.data;
        $rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while getting discussions');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };

     $scope.getDiscussions = function(){
        var clazzinfo = {"clazzName":$rootScope.user.clazzName};

       discussionService.getDisscussionPosts(clazzinfo,0)
    .then(
     function(d) {
     	$scope.discussionText = "";
        $scope.discussions= d.data;
        //$rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while getting discussions');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };
     $scope.deletePost = function(post){
       
       discussionService.deleteDisscussionPost(post)
    .then(
     function(d) {
     	$scope.discussionText = "";
        $scope.discussions= d.data;
       	//$rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while getting discussions');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };

    $scope.addComment = function(postId,commentContent){
    	var comment = {"content" : commentContent,"author":$rootScope.user.name , "authorEmailId":$rootScope.user.emailId };
       discussionService.createDiscussionComment(postId,comment)
    .then(
     function(d) {
     	$scope.discussionText = "";
        $scope.discussions= d.data;
        $rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while getting discussions');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };

    $scope.deletePostComment = function(postId,comment){
    	
       discussionService.deleteDiscussionComment(postId,comment)
    .then(
     function(d) {
     	$scope.discussionText = "";
        $scope.discussions= d.data;
        $rootScope.notify(d.response.message); 
     
    },
    function(errResponse){
      console.error('Error while getting discussions');
    }).finally(function(){
        $rootScope.isLoading = false;
        });     
    };

});
