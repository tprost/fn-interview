var photos = require('../controllers/photos.controller.js');

module.exports = function(app) {
  app.get('/api/photos', photos.publicPhotos);

  app.get('/api/me/photos', photos.userPhotos);
  app.post('/api/me/photos', photos.createPhoto);
  app.put('/api/me/photos/:id', photos.updatePhoto);
  app.delete('/api/me/photos/:id', photos.deletePhoto);

};
