(function() {
    'use strict';

    angular
        .module('uamProject')
				.controller('CreateCtrl', CreateCtrl);

		function CreateCtrl($scope) {
				$scope.emails = [];
		}

})();
