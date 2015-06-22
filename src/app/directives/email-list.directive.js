(function() {
    'use strict';

    angular
        .module('uamProject')
        .directive('emailList', emailList);

        function emailList() {
          return {
            restrict: 'E',
            scope: {
              refreshTime: "@",
              type: "@"
            },
            templateUrl: 'app/directives/email-list.directive.html',
            controller: function ($scope, $sce, $stateParams, filterFilter, $filter,  mailService) {
                $scope.filteredEmails = []
                $scope.itemsPerPage = 15;
                $scope.currentPage = 1;
                $scope.totalItems = 1;

                var emails = [];
                $scope.search = {};

                $scope.figureOutEmailsToDisplay = function() {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                    var end = begin + $scope.itemsPerPage;
                    $scope.filteredEmails = $scope.emails.slice(begin, end);
                    $scope.totalItems = $scope.emails.length;
                };

                $scope.pageChanged = function() {
                    $scope.figureOutEmailsToDisplay();
                };

                if ($scope.type == 'inbox') {
                  mailService.inboxList().success(function(data){
                    emails = $filter('orderBy')(data, '-received', false);
                    $scope.emails = emails;
                    $scope.figureOutEmailsToDisplay();
                  });
                } else {
                  mailService.outboxList().success(function(data){
                    emails = $filter('orderBy')(data, '-sent', false);
                    $scope.emails = emails;
                    $scope.figureOutEmailsToDisplay();
                  });
                }


                $scope.highlight = function(text, search) {
                    if (!search) {
                        return $sce.trustAsHtml(text);
                    }
                    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
                };

                $scope.$watch('search', function (newVal, oldVal) {

                    $scope.emails = filterFilter(emails, newVal);
                    $scope.figureOutEmailsToDisplay();


                    console.log('search');
                    $scope.currentPage = 1;
                }, true);
            }
          };
        }

})();
