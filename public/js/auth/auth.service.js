angular.module('app').service('auth', function($http) {

  this.login = function(credentials) {
    return $http.post('/api/login', credentials);
  };

  this.logout = function() {
    return $http.get('/api/logout');
  };

  this.me = function() {
    return $http.get('/api/me');
  };


});
