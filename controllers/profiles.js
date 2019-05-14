const Profile = require('../models/profile');

module.exports ={
    new: newProfile,
    create,
    show,
}

//functions go here
function show(req, res){
    Profile.findById(req.params.id, function(err, profile){
        res.render('profiles/show', {user: req.user, profile});
    });
}

function newProfile(req, res){
    res.render('profiles/show',{user: req.user})
}

function create(req, res){
    if (req.body.favoriteCharacters === '') delete req.body.favoriteCharacters;
    if (req.body.favoriteEpisodes === '') delete req.body.favoriteEpisodes;
    if (req.body.favoriteQuotes === '') delete req.body.favoriteQuotes;
    console.log(req.body);
    var profile = new Profile(req.body);
     
        
    profile.save(function(err){
        if (err) return res.render('profiles/index');
        res.redirect('/profiles');
    });
}

