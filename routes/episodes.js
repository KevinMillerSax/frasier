var express = require('express');
var router = express.Router();
const episodesCtrl = require('../controllers/episodes');
const authorization = require('../utilities/authorize');

router.post('/', episodesCtrl.create);
router.get('/new', episodesCtrl.new);
router.get('/:id', episodesCtrl.show);

//comments route
router.post('/:id/comments', authorization.isLoggedIn, episodesCtrl.comment)
router.post('/:id/like', authorization.isLoggedIn, episodesCtrl.like)
router.post('/:id/dislike', authorization.isLoggedIn, episodesCtrl.dislike)


module.exports = router;