(function() {
    'use strict';

    angular
        .module('uamProject.create')
		.controller('CreateCtrl', CreateCtrl);

		function CreateCtrl($scope) {
				$scope.emails = [];
		}

})();
