'use strict';

angular.module('uamProject', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/view/create.html',
        controller: 'CreateCtrl'
      });
    $urlRouterProvider.otherwise('/');
  })
;
