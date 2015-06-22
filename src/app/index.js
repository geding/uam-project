'use strict';

angular.module('uamProject', [
  'ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap',
  'uamProject.create', 'uamProject.inbox', 'uamProject.sent', 'uamProject.view'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'app/inbox/inbox.html',
        controller: 'InboxCtrl'
      })
      .state('sent', {
        url: '/sent',
        templateUrl: 'app/sent/sent.html',
        controller: 'SentCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      })
      .state('createReply', {
        url: '/create/{emailId:int}',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      })
      .state('view', {
        url: '/view/{emailId:int}',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl'
      });
    $urlRouterProvider.when('/create/', '/create');
    $urlRouterProvider.otherwise('/inbox');
  });
