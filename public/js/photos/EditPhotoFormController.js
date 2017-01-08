angular.module('app').controller('EditPhotoFormController', function($scope, photos, $window) {

  $scope.controller = this;


  this.setPhoto = function(photo) {
    $scope.photo = {};
    angular.copy(photo, $scope.photo);
  };

  this.update = function() {
    photos.update($scope.photo);
  };

  this.delete = function(photo) {
    return photos.delete($scope.photo).then(function() {
      $window.location.href = $window.location.href;
    });
  };

});
