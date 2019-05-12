var express = require('express');
var router = express.Router();
const episodesCtrl = require('../controllers/episodes');

router.post('/', episodesCtrl.create);
router.get('/new', episodesCtrl.new);
router.get('/:id', episodesCtrl.show);


module.exports = router;