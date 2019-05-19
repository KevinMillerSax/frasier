const Episode = require('../models/episode');
const Actor = require('../models/actor');

module.exports = {
    new: newEpisode,
    create,
    show,
    comment,
    like,
    dislike,
    indexSeason,
    deleteComment,

}

//functions here

function deleteComment(req, res){
 
    Episode.findByIdAndUpdate(req.params.id, {
        $pull: {
            'comments': {'_id': req.params.comment_id}
        }
    }, function(err, episode){
            if (err) console.log(err);
            res.redirect(`/episodes/${episode._id}`);      
    });
}

function indexSeason(req, res){
    
    Episode.find({seasonNumber: req.params.season}, function(err, episodes){
        let ourNumber = req.params.season;
        res.render('episodes/seasons', {user: req.user, episodes, ourNumber});
    });
}



function like(req, res){
    console.log(req.user);
    Episode.findById(req.params.id, function(err, episode) {
       if (!episode.likes.includes(req.user._id) && !episode.dislikes.includes(req.user._id)) {
            episode.likes.push(req.user._id)//validate this to check if user ID is inside 
       } else {
           episode.likes.splice(episode.likes.indexOf(req.user._id), 1);
       }
       episode.save(function(err, episode){
        if (err) console.log(err);
        res.redirect(`/episodes/${episode._id}`);
    });
    });
}

function dislike(req, res){
    Episode.findById(req.params.id, function(err, episode){
        if(!episode.dislikes.includes(req.user._id) && !episode.likes.includes(req.user._id)) {
            episode.dislikes.push(req.user._id)
        } else {
            episode.dislikes.splice(episode.dislikes.indexOf(req.user._id), 1);
        }
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
    Episode.findById(req.params.id).populate('cast')
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
    let episode = new Episode(req.body);
    console.log(episode);
    episode.save(function(err, episode){
        if (err) console.log(err);
        // res.redirect('episodes/new')
        res.redirect(`episodes/${episode._id}`);
    });
}