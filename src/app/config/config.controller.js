(function() {
    'use strict';

    angular
        .module('uamProject.config')
		.controller('ConfigCtrl', ConfigCtrl);

		function ConfigCtrl($scope) {
        $scope.refreshTime = $scope.$parent.refreshTime;
        $scope.colors = [{name: 'red', value: 'red'},
          {name: 'blue', value: 'blue'},
          {name: 'green', value: 'green'},
          {name: 'brown', value: 'brown'},
          {name: 'default', value: '#e7e7e7'}];
        $scope.changeColor = function(color) {
          $scope.$parent.backgroundColor = color.value;
        };
        $scope.$watch('refreshTime', function () {
          $scope.$parent.refreshTime = $scope.refreshTime;
        }, true);

		}

})();
