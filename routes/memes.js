var express = require('express');
var router = express.Router();
const memesCtrl = require('../controllers/memes');
const authorization = require('../utilities/authorize');

router.post('/', memesCtrl.create);
router.get('/new', memesCtrl.new);
router.get('/', memesCtrl.index);

//comments route
router.post('/:id/comments', authorization.isLoggedIn, memesCtrl.comment)
router.post('/:id/like', authorization.isLoggedIn, memesCtrl.like)
router.post('/:id/dislike', authorization.isLoggedIn, memesCtrl.dislike)


module.exports = router;