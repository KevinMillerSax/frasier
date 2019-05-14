const Fan = require('../models/fan');

module.exports = {
    index,
    showMy,
    update,
}

function update(req, res){
  let myKey = Object.keys(req.body)[0];
  let myValue = Object.values(req.body)[0];
  let existingValues = req.user[myKey];
  existingValues.push(myValue);
  let updateObject = {
    [myKey]: existingValues,
  }
  Fan.findByIdAndUpdate(req.user._id, updateObject, function(err, profile){
    res.render('fans/myProfile', {user: req.user});
  })
}

function showMy(req, res){
  
   res.render('fans/myProfile', {user: req.user});
}

function index(req, res, next){
    console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Fan.find(modelQuery)
  .sort(sortKey).exec(function(err, fans) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('fans/index', {
      fans,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}