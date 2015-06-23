(function() {
    'use strict';

    angular
        .module('uamProject.inbox')
		.controller('InboxCtrl', InboxCtrl);

		function InboxCtrl($scope) {
        $scope.refreshTime = $scope.$parent.refreshTime;
        $scope.remove = function(){
            console.log('in');
        };
		}

})();
