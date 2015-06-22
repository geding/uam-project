(function() {
  'use strict';

  angular
    .module('uamProject')
    .service('mailService', mailService);

  function mailService($http){
    return {
      send: function(email) {
        email.id =  Date.now();
        email.sent = Date.now();
        return $http.post('http://localhost:8080/sent', email);
      },
      get: function(emailId) {
          return $http.get('http://localhost:8080/emails/' + emailId);
      },
      inboxList: function() {
          return $http.get('http://localhost:8080/emails/');
      },
      outboxList: function() {
          return $http.get('http://localhost:8080/sent/');
      },
      delete: function(emailId) {
          return $http.delete('http://localhost:8080/emails/' + emailId);
      },
      deleteSent: function(emailId) {
          return $http.delete('http://localhost:8080/sent/' + emailId);
      }
    }
  }

})();
