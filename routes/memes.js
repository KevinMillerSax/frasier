var express = require('express');
var router = express.Router();
const memesCtrl = require('../controllers/memes');
const authorization = require('../utilities/authorize');

//cloudinary stuff
var multer = require('multer');
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function(req, file, cb) {
    //only accept image
    if (!file.originalname.match(/\.(jpg|jpeg|png|git)$/i)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});


//end cloudinary stuff


router.post('/', authorization.isLoggedIn, upload.single('photo'), memesCtrl.create);
router.get('/new', authorization.isLoggedIn, memesCtrl.new);
router.get('/', memesCtrl.index);

//comments route
router.post('/:id/comments', authorization.isLoggedIn, memesCtrl.comment);
router.post('/:id/like', authorization.isLoggedIn, memesCtrl.like);
router.post('/:id/dislike', authorization.isLoggedIn, memesCtrl.dislike);
router.delete('/:id/comments/:comment_id', authorization.isLoggedIn, memesCtrl.deleteComment);

module.exports = router;



