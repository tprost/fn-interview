angular.module('app').controller('PublicPhotosListController', function($scope, $window, photos) {

  $scope.controller = this;

  $scope.photos = [];

  $scope.pageSize = 5;

  $scope.maximumPageNumber = 1;

  $scope.page = {
    number: 1,
    photos: []
  };

  this.getPublicPhotos = function() {
    return photos.getPublicPhotos().then(function(res) {
      $scope.photos = res.data.photos;
      $scope.maximumPageNumber = Math.ceil($scope.photos.length / $scope.pageSize);
      $scope.controller.setPageNumber(1);
    });
  };

  this.setPageNumber = function(pageNumber) {
    $scope.page.number = pageNumber;
    var startIndex = ($scope.page.number-1)*$scope.pageSize;
    $scope.page.photos =
      $scope.photos.slice(startIndex, startIndex + $scope.pageSize);
    $scope.page.last = $scope.page.number === $scope.maximumPageNumber;
    $scope.page.first = $scope.page.number === 1;
  };

  this.nextPage = function() {
    if ($scope.page.number < $scope.maximumPageNumber)
      $scope.controller.setPageNumber($scope.page.number + 1);
  };

  this.previousPage = function() {
    if ($scope.page.number > 1)
      $scope.controller.setPageNumber($scope.page.number - 1);
  };

});
