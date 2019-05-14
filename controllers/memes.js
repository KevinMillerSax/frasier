const Meme = require('../models/meme');

module.exports ={
    index,
    new: newMeme,
    create,
    like,
    dislike,
    comment
}

function comment(req, res){
    req.body.userName = req.user.name;
    Meme.findById(req.params.id, function(err, meme){
        meme.comments.push(req.body);
        meme.save(function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes/index');
        });
    }); 
}

function like(req, res){
    Meme.findById(req.params.id, function(err, meme){
        let currentLikes = meme.likes;
        meme.likes = currentLikes + 1;
        meme.save(function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes/index');
        });
    });
}

function dislike(req, res){
    Meme.findById(req.params.id, function(err, meme){
        let currentDislikes = meme.dislikes;
        meme.dislikes = currentDislikes + 1;
        meme.save(function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes/index');
        });
    });
}

function create(req, res){
    Meme.create(function(err, meme){
        if (err) console.log(err);
        res.redirect('/memes/index');
    });
}

function index(req, res){
    Meme.find({}, function(err, memes){
        res.render('memes/index', {user: req.user, memes})
    });
}

function newMeme(req, res){
   res.render('memes/new', {user: req.user});
}