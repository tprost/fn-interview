angular.module('app').directive('fnLoginForm', function() {


  function postLink() {

  };

  return {
    restrict: 'C',
    scope: true,
    controller: "LoginFormController",
    templateUrl: '/templates/login-form.html',
    link: postLink
  };
});
