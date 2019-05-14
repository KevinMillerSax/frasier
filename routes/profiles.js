var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controllers/profiles');
const authorization = require('../utilities/authorize');

module.exports = router;

router.get('/new', profilesCtrl.new);
router.post('/', profilesCtrl.create);
router.get('/:id', profilesCtrl.show);