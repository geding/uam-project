(function() {
    'use strict';

    angular
        .module('uamProject.sent')
		.controller('SentCtrl', SentCtrl);

		function SentCtrl($scope) {
      $scope.refreshTime = $scope.$parent.refreshTime;
		}

})();
