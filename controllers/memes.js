const Meme = require('../models/meme');


var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



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
    req.body.userId = req.user._id;
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
       if (!meme.likes.includes(req.user._id) && !meme.dislikes.includes(req.user._id)) {
            meme.likes.push(req.user._id)//validate this to check if user ID is inside 
       } else {
           meme.likes.splice(meme.likes.indexOf(req.user._id), 1);
       }
       meme.save(function(err, meme){
        console.log(meme);
        if (err) console.log(err);
        res.json({likes: meme.likes, userId: req.user._id});
    });
    });
    
}

function dislike(req, res){
    console.log(req.user);
    Meme.findById(req.params.id, function(err, meme){
        if(!meme.dislikes.includes(req.user._id) && !meme.likes.includes(req.user._id)) {
            meme.dislikes.push(req.user._id)
        } else {
            meme.dislikes.splice(meme.dislikes.indexOf(req.user._id), 1);
        }
        meme.save(function(err, meme){
            if (err) console.log(err);
            
            res.json({dislikes: meme.dislikes, userId: req.user._id});
        });
    });
}

//cloudinary create
function create(req, res){
    cloudinary.uploader.upload(req.file.path, function(result){
        console.log(result);
        req.body.photo = result.secure_url;
        req.body.userName = req.user.name;
        Meme.create(req.body, function(err, meme){
            if (err){
                req.flash('error', err.message);
                return res.redirect('/memes');
            }
            res.redirect('/memes/')
        });
    });   
}


//end cloudinary create

function index(req, res){
    Meme.find({}, function(err, memes){
        res.render('memes/index', {user: req.user, memes})
    });
}

function newMeme(req, res){
   res.render('memes/new', {user: req.user});
}