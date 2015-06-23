(function() {
  'use strict';

  angular
    .module('uamProject')
    .service('mailService', mailService);

  function mailService($http){
    return {
      send: function(email) {
        email.id = Date.now().toString();
        email.sent = Date.now();
        return $http.post('http://localhost:8080/sent', email);
      },
      get: function(emailId) {
        return $http.get('http://localhost:8080/emails/' + emailId).then(function(result){
          if(result.status !== 200) {
            return result;
          } else {
            result.data.read = true;
            return $http.put('http://localhost:8080/emails/' + emailId, result.data);
          }
        });
      },
      put: function(email) {
        return $http.put('http://localhost:8080/emails/' + email.id, email);
      },
      getSent: function(emailId) {
        return $http.get('http://localhost:8080/sent/' + emailId).then();
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
    };
  }

})();
