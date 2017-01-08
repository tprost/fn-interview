angular.module('app').service('photos', function($http) {

  this.getUserPhotos = function() {
    return $http.get('/api/me/photos');
  };

  this.getPublicPhotos = function() {
    return $http.get('/api/photos');
  };

  this.create = function(photo) {
    return $http.post('/api/me/photos', photo);
  };

  this.update = function(photo) {
    return $http.put('/api/me/photos/' + photo.id, photo);
  };

  this.delete = function(photo) {
    return $http.delete('/api/me/photos/' + photo.id);
  };

});
