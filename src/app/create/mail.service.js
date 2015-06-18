(function() {
  'use strict';

  angular
    .module('uamProject.create')
    .service('mailService', mailService);

  function mailService($http){
    return {
      send: function(email) {
        email.id =  Date.now();
        email.sent = Date.now();
        console.log(email);
        return $http.post('http://localhost:8080/sent', email);
      },
      get: function(emailId) {
          return $http.get('http://localhost:8080/emails/' + emailId);
      }
    }
  }

})();
