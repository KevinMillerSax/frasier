const Actor = require('../models/actor');

module.exports = {
    show,
    new: newActor,
    create,
    index
}

//functions go here!

function show(req, res){
    Actor.findById(req.params.id).then(actor => {
        res.render('actors/show', {user: req.user, actor});
    });
}

function newActor(req, res){
    res.render('actors/new', {user: req.user}); //this is a path to the views
}

function create(req, res){
    console.log(req.body);
    Actor.create(req.body, function(err, actor) {
        console.log(actor);
        let url = `/actors/${actor._id}`
        res.redirect(url);
    });
}

function index(req, res){
    Actor.find({}, function(err, actors){
        if (err) console.log(err);
        res.render('actors/index', {user: req.user, actors});
    });
}