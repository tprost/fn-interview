angular.module('app').directive('fnLogoutButton', function($window, auth) {

  function postLink(scope, elem, attrs) {
    elem.bind('click', function(e) {
      e.preventDefault();
      auth.logout().then(function() {
        $window.location.href = '/';
      });
    });
  };

  return {
    restrict: 'C',
    link: postLink
  };
});
