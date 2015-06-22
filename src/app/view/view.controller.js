(function() {
    'use strict';

    angular
        .module('uamProject.view')
		.controller('ViewCtrl', ViewCtrl);

		function ViewCtrl($scope, $stateParams, mailService, $state) {
      var sufix = "";
      $scope.type = $stateParams.type;
      if($stateParams.type == "sent"){
        sufix = "Sent"
      }

      mailService["get"+sufix]($stateParams.emailId).success(function(data){
        data.read = true;
        if($scope.type == "inbox"){
          mailService.put(data).success(function(data){
            $scope.email = data;
            $scope.email.received = new Date($scope.email.received);
            $scope.email.sent = new Date($scope.email.sent);
          }).error(function(e){
            $scope.errorMsg = e;
          });
        } else {
          $scope.email = data;
          $scope.email.received = new Date($scope.email.received);
          $scope.email.sent = new Date($scope.email.sent);
        }
      }).error(function(e){
        $scope.errorMsg = e;
      });

      $scope.delete = function(){

        mailService["delete"+sufix]($stateParams.emailId).success(function(){
          $state.go($stateParams.type, {}, {reload: true});
        }).error(function(e){
          $scope.errorMsg = e;
        });
      }
		}

})();
