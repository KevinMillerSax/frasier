var express = require('express');
var router = express.Router();
const episodesCtrl = require('../controllers/episodes');
const authorization = require('../utilities/authorize');

router.get('/season/:season', episodesCtrl.indexSeason);
router.post('/', episodesCtrl.create);
router.get('/new', episodesCtrl.new);
router.get('/:id', episodesCtrl.show);

//comments route
router.post('/:id/comments', authorization.isLoggedIn, episodesCtrl.comment);
router.post('/:id/like', authorization.isLoggedIn, episodesCtrl.like);
router.post('/:id/dislike', authorization.isLoggedIn, episodesCtrl.dislike);
router.delete('/:id/comments/:comment_id', authorization.isLoggedIn, episodesCtrl.deleteComment);


module.exports = router;