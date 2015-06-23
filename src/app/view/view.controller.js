(function() {
    'use strict';

    angular
        .module('uamProject.view')
		.controller('ViewCtrl', ViewCtrl);

		function ViewCtrl($scope, $stateParams, mailService, $state) {
      var sufix = '';
      $scope.type = $stateParams.type;
      if($stateParams.type === 'sent'){
        sufix = 'Sent';
      }

      mailService['get'+sufix]($stateParams.emailId).then(function(result){
        $scope.email = result.data;
        $scope.email.received = new Date($scope.email.received);
        $scope.email.sent = new Date($scope.email.sent);
      }).catch(function(result){
        if(!result.data){
          result.data = 'Connection error';
        }
        $scope.errorMsg = result.data;
      });

      $scope.delete = function(){

        mailService['delete'+sufix]($stateParams.emailId).success(function(){
          $state.go($stateParams.type, {}, {reload: true});
        }).error(function(e){
          $scope.errorMsg = e;
        });
      };
      
		}

})();
