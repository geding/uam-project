(function() {
    'use strict';

    angular
        .module('uamProject')
		.controller('IndexCtrl', IndexCtrl);

		function IndexCtrl($scope, localStorageService) {
      $scope.backgroundColor = localStorageService.get('backgroundColor') || "#e7e7e7";
      $scope.refreshTime = localStorageService.get('refreshTime') || 30;

      $scope.$watch('backgroundColor', function () {
        localStorageService.set('backgroundColor', $scope.backgroundColor);
      }, true);

      $scope.$watch('refreshTime', function () {
        localStorageService.set('refreshTime', $scope.refreshTime);
      }, true);
		}

})();
