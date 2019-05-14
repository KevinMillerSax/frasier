const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    favoriteCharacters:  {
        type: [String],
    },    
    favoriteEpisodes:  {
        type: [String],
    },    
    favoriteQuotes: {
        type: [String],
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Fan', fanSchema);