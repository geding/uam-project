(function() {
    'use strict';

    angular
        .module('uamProject.create')
		.controller('CreateCtrl', CreateCtrl);

		function CreateCtrl($scope, $stateParams, $timeout, mailService) {
				$scope.receivers = [];
        $scope.alerts = [];

        if($stateParams.emailId !== undefined) {
          // create in reply of
          mailService.get($stateParams.emailId).success(function(data){
            $scope.receivers.push({name: data.sender});
            $scope.title = "Re: " + data.title;
            $scope.content = "\n\n==== In reply on ====\n\n" + data.content;
          });
        }

        $scope.alertClose = function(index){
          $scope.alerts.splice(index, 1);
        };

        $scope.send = function() {
          var email = {
            title: $scope.title,
            receivers: $scope.receivers.map(function(currentValue) {
                return currentValue.name;
            }),
            content: $scope.content
          };

          if(email.title != undefined
            && email.receivers.length > 0
            && email.content !== undefined
            && email.content !== ""){
              mailService.send(email).success(function(){
                $scope.alerts.push({type: 'success', msg: 'Mail sent.'});
              }).error(function(){
                $scope.alerts.push({type: 'danger', msg: 'There was an error.'});
              });
          } else {
            $scope.alerts.push({type: 'danger', msg: 'Fields should not be blank.'});
          }
        }
		}

})();
