(function() {
    'use strict';

    angular
        .module('uamProject.create')
		.controller('CreateCtrl', CreateCtrl);

		function CreateCtrl($scope, $stateParams, mailService, $location) {
				$scope.receivers = [];
        $scope.alerts = [];
        $scope.fireRequired = false;

        $scope.validateEmail = function(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        };

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
              $scope.fireRequired = false;
              mailService.send(email).success(function(){
                //relocate to sent
                $location.path('/sent', false);
              }).error(function(){
                $scope.alerts.push({type: 'danger', msg: 'There was an error.'});
              });
          } else {
            $scope.fireRequired = true;
            $scope.alerts.push({type: 'danger', msg: 'Fields should not be blank.'});
          }
        }
		}

})();
