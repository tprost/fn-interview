angular.module('app').directive('fnMyPhotos', function() {

  function postLink(scope, elem, attrs, ctrl) {
    ctrl.getUserPhotos();
  };

  return {
    restrict: 'C',
    scope: true,
    controller: "PhotosController",
    templateUrl: '/templates/my-photos.html',
    link: postLink
  };
});
