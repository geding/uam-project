(function() {
    'use strict';

    angular
        .module('uamProject.inbox')
		.controller('InboxCtrl', InboxCtrl);

		function InboxCtrl($scope, $stateParams, filterFilter, $filter,  mailService) {
            $scope.filteredEmails = []
            $scope.itemsPerPage = 15;
            $scope.currentPage = 1;
            $scope.totalItems = 1;

            var emails = [];
            $scope.search = {};

            $scope.figureOutEmailsToDisplay = function() {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                var end = begin + $scope.itemsPerPage;
                $scope.filteredEmails = emails.slice(begin, end);
                $scope.totalItems = emails.length;
            };

            $scope.pageChanged = function() {
                $scope.figureOutEmailsToDisplay();
            };

            mailService.list().success(function(data){
                emails = $filter('orderBy')(data, '-received', false);

                $scope.figureOutEmailsToDisplay();
            });

            $scope.$watch('search', function (newVal, oldVal) {

                $scope.filteredEmails = filterFilter(emails, newVal);
                $scope.totalItems = emails.length;
                console.log('search');
                $scope.currentPage = 1;
            }, true);
		}

})();
