angular.module('app').directive('fnNewPhotoForm', function() {
  return {
    restrict: 'C',
    scope: true,
    controller: "PhotosController",
    templateUrl: '/templates/new-photo-form.html'
  };
});
