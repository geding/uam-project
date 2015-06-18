'use strict';

angular.module('uamProject', [
  'ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap',
  'uamProject.create'
  ])
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
      })
      .state('createReply', {
        url: '/create/{emailId:int}',
        templateUrl: 'app/create/view/create.html',
        controller: 'CreateCtrl'
      });
    $urlRouterProvider.when('/create/', '/create');  
    $urlRouterProvider.otherwise('/');
  });
