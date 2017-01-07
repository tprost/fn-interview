angular.module('app').controller('PhotosController', function($scope, $window, photos) {

  $scope.controller = this;

  this.submitNewPhoto = function() {
    return photos.create($scope.photo).then(function() {
      // $window.location.href = '/';
    });
  };

  this.getUserPhotos = function() {
    return photos.getUserPhotos().then(function(res) {
      $scope.photos = res.data.photos;
    });
  };

});
