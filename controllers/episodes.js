const Episode = require('../models/episode');

module.exports = {
    new: newEpisode,
    create,
    show

}

//functions here
function show(req, res){
    Episode.findById(req.params.id).then(episode => {
        res.render('episodes/show', {user: req.user, episode});
    });
}

function newEpisode(req, res){
    res.render('episodes/new', {user: req.user});
}

function create(req, res){
   Episode.create(req.body, function(err, episode){
       if (err) console.log(err);
       res.redirect(`/episodes/${episode._id}`)
   });

}