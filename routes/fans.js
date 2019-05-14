var express = require('express');
var router = express.Router();
const fansCtrl = require('../controllers/fans');
const authorization = require('../utilities/authorize');

//routes

router.get('/', fansCtrl.index);
router.get('/profile', authorization.isLoggedIn, fansCtrl.showMy);
router.put('/profile', authorization.isLoggedIn, fansCtrl.update);

module.exports = router; 

