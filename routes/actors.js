var express = require('express');
var router = express.Router();
const actorsCtrl = require('../controllers/actors');

//routes

router.get('/', actorsCtrl.index);
router.get('/new', actorsCtrl.new);
router.post('/', actorsCtrl.create);
router.get('/:id', actorsCtrl.show);


module.exports = router; 

