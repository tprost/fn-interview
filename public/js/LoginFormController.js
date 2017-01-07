angular.module('app').controller('LoginFormController', function($scope, $window, auth) {

  this.hello = "hello";

  $scope.controller = this;

  this.submit = function() {

    return auth.login($scope.credentials).then(function() {
      $window.location.href = '/';
    });
  };

  this.me = function() {
    return auth.me();
  };

});
