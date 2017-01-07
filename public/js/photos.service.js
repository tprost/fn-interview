angular.module('app').service('photos', function($http) {

  this.getUserPhotos = function() {
    return $http.get('/api/me/photos');
  };

  this.create = function(photo) {
    return $http.post('/api/me/photos', photo);
  };

  this.update = function(photo) {
    return $http.put('/api/me/photos/' + photo.id, photo);
  };

  this.delete = function(id) {
    return $http.delete('/api/me/photos/:id');
  };

});
