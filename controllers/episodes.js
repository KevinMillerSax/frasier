const Episode = require('../models/episode');
const Actor = require('../models/actor');

module.exports = {
    new: newEpisode,
    create,
    show,
    comment,
    like,
    dislike

}

//functions here

function like(req, res){
    Episode.findById(req.params.id, function(err, episode){
        let currentLikes = episode.likes;
        episode.likes = currentLikes + 1;
        episode.save(function(err, episode){
            if (err) console.log(err);
            res.redirect(`/episodes/${episode._id}`);
        });
    });
}
function dislike(req, res){
    Episode.findById(req.params.id, function(err, episode){
        let currentDislikes = episode.dislikes;
        episode.dislikes = currentDislikes + 1;
        episode.save(function(err, episode){
            if (err) console.log(err);
            res.redirect(`/episodes/${episode._id}`);
        });
    });
}


function comment(req, res){
    req.body.userName = req.user.name;
    Episode.findById(req.params.id, function(err, episode){
        episode.comments.push(req.body);
        episode.save(function(err, episode){
            if (err) console.log(err);
            res.redirect(`/episodes/${episode._id}`);
        });
    }); 
}



function show(req, res){
    Episode.findById(req.params.id)
    .then(episode => {
        console.log(episode);
        res.render('episodes/show', {user: req.user, episode});
    });
}

function newEpisode(req, res){
    res.render('episodes/new', {user: req.user});
}

async function create(req, res){
    let date = new Date(req.body.airDate);
    console.log(date);
    req.body.airDate = date;
    //catching actors
    let actors = req.body.cast.split(', ');
    req.body.cast = actors;
    let episode = new Episode(req.body);
    console.log(episode);
    episode.save(function(err, episode){
        if (err) console.log(err);
        res.redirect(`episodes/${episode._id}`);
    });
    

}