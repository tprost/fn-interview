angular.module('app').directive('fnEditPhotoForm', function() {

  function postLink(scope, elem, attrs, ctrl) {
    ctrl.setPhoto(scope.photo);
  };

  return {
    restrict: 'C',
    scope: {
      photo: '='
    },
    controller: "EditPhotoFormController",
    templateUrl: '/templates/edit-photo-form.html',
    link: postLink
  };
});
