var controller = require('../controllers/home.js');

var express = require('express');
var router  = express.Router();

router.get('/', controller.home);
router.get('/index.html', controller.home);

module.exports = router;
