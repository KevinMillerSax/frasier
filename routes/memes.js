var express = require('express');
var router = express.Router();
const memesCtrl = require('../controllers/memes');
const authorization = require('../utilities/authorize');

router.post('/', authorization.isLoggedIn, memesCtrl.create);
router.get('/new', authorization.isLoggedIn, memesCtrl.new);
router.get('/', memesCtrl.index);

//comments route
router.post('/:id/comments', authorization.isLoggedIn, memesCtrl.comment);
router.post('/:id/like', authorization.isLoggedIn, memesCtrl.like);
router.post('/:id/dislike', authorization.isLoggedIn, memesCtrl.dislike);
router.delete('/:id/comments/:comment_id', authorization.isLoggedIn, memesCtrl.deleteComment);


module.exports = router;