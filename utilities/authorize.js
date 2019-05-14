function isLoggedIn(req, res, next){
    if(req.isAuthenticated() ){
        return next();
    }
    res.redirect('/unauthorized');
}

module.exports =  {
    isLoggedIn,
}