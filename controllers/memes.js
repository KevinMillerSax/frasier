const Meme = require('../models/meme');

module.exports ={
    index,
    new: newMeme,
    create,
    like,
    dislike,
    comment,
    deleteComment,
}

function deleteComment(req, res){
 
    Meme.findByIdAndUpdate(req.params.id, {
        $pull: {
            'comments': {'_id': req.params.comment_id}
        }
    }, function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes');      
    });
}

function comment(req, res){
    req.body.userName = req.user.name;
    Meme.findById(req.params.id, function(err, meme){
        meme.comments.push(req.body);
        console.log(req.body);
        meme.save(function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes');
        });
    }); 
}

function like(req, res){
    console.log(req.user);
    Meme.findById(req.params.id, function(err, meme) {
       // if
        meme.likes.push(req.user._id)//validate this to check if user ID is inside 
        meme.save(function(err, meme){
            console.log(meme);
            if (err) console.log(err);
            res.redirect('/memes');
        });
    });
}

function dislike(req, res){
    Meme.findById(req.params.id, function(err, meme){
        let currentDislikes = meme.dislikes;
        meme.dislikes = currentDislikes + 1;
        meme.save(function(err, meme){
            if (err) console.log(err);
            res.redirect('/memes');
        });
    });
}

function create(req, res){
    req.body.userName = req.user.name;
    let meme = new Meme(req.body);
    
    console.log(req.body.userName);
    meme.save(function(err){
        if (err) return res.redirect('memes/new');
        console.log(meme);
        res.redirect('/memes');
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