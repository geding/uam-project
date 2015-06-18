(function() {
    'use strict';

    angular
        .module('uamProject.create')
        .directive('tagsField', tagsField);

        function validateEmail(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        }

        function tagsField() {
          return {
            restrict: 'E',
            scope: {
              inputTags: "="
            },
            templateUrl: 'app/create/view/tags-field.html',
            controller: function ($scope, $element, $attrs) {
              $scope.tagText = '';

              // Input field key binding
              var inputField = angular.element($element[0].getElementsByTagName('input')[0]);

              $element.bind('click', function(){
                inputField[0].focus();
              });

            	$scope.addTag = function() {
            		if ($scope.tagText.length == 0 || !validateEmail($scope.tagText)) {
            			return;
            		}

            		$scope.inputTags.push({name: $scope.tagText});
            		$scope.tagText = '';
            	}

            	$scope.deleteTag = function(key) {
            		if ($scope.inputTags.length > 0 &&
            			$scope.tagText.length == 0 &&
                  isNaN(key)) {
                    $scope.inputTags.pop();
            		} else if (!isNaN(key)) {
                  $scope.inputTags.splice(key, 1);
            		}
            	}

        			$scope.inputWidth = 20;

        			// Watch for changes in text field
        			$scope.$watch('tagText', function(value) {
        				if (value != undefined) {
                  var tempEl = document.createElement('span');
                  tempEl.setAttribute("class", "calculateWidth");
                  tempEl.innerHTML = value;
                  document.getElementsByTagName('body')[0].appendChild(tempEl);
        					$scope.inputWidth = tempEl.offsetWidth + 15;
        					tempEl.remove();
        				}
        			});

              inputField.bind('keydown', function(e) {
                // Prevent default Tab
        				if (e.which == 9 || e.which == 13) {
        					e.preventDefault();
        				}

                // Delete on Backspace
        				if (e.which == 8) {
        					$scope.$apply($scope.deleteTag);
        				}
        			});

              inputField.bind('keyup', function(e) {
        				var key = e.which;

        				// Tab or Enter pressed
        				if (key == 9 || key == 13) {
        					e.preventDefault();
        					$scope.$apply($scope.addTag);
        				}
        			});

              inputField.bind('focus', function(){
                  $element[0].classList.add("active");
              });

              inputField.bind('blur', function(){
                  $element[0].classList.remove("active");
              });

              inputField[0].focus();
        		}
          };
        }

})();
