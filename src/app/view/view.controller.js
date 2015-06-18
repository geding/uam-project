(function() {
    'use strict';

    angular
        .module('uamProject.view')
		.controller('ViewCtrl', ViewCtrl);

		function ViewCtrl($scope, $stateParams, mailService, $location) {
      mailService.get($stateParams.emailId).success(function(data){
        $scope.email = data;
        $scope.email.received = new Date($scope.email.received);
      }).error(function(e){
        $scope.errorMsg = e;
      });

      $scope.delete = function(){
        mailService.delete($stateParams.emailId).success(function(){
          $location.path('/inbox', false);
        }).error(function(e){
          $scope.errorMsg = e;
        });
      }
		}

})();
