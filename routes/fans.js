var express = require('express');
var router = express.Router();
const fansCtrl = require('../controllers/fans');

//routes

router.get('/', fansCtrl.index);

module.exports = router; 

