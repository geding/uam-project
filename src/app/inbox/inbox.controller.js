(function() {
    'use strict';

    angular
        .module('uamProject.inbox')
		.controller('InboxCtrl', InboxCtrl);

		function InboxCtrl($scope) {
            $scope.remove = function(){
                console.log('in');
            }
		}

})();
