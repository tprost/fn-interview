angular.module('app').controller('EditPhotoFormController', function($scope, photos) {

  $scope.controller = this;


  this.setPhoto = function(photo) {
    $scope.photo = {};
    angular.copy(photo, $scope.photo);
  };

  this.submit = function() {
    photos.update($scope.photo);
  };

});
