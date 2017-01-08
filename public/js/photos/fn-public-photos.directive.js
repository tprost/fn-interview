angular.module('app').directive('fnPublicPhotos', function() {

  function postLink(scope, elem, attrs, ctrl) {
    ctrl.getPublicPhotos();
  };

  return {
    restrict: 'C',
    scope: true,
    controller: "PublicPhotosListController",
    templateUrl: '/templates/public-photos.html',
    link: postLink
  };
});
