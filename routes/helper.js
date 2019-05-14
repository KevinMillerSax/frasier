var express = require('express');
var router = express.Router();


//routes

router.get('/', function(req, res){
    res.render('unauthorized', {user:req.user});
})

module.exports = router; 

