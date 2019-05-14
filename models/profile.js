const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const profileSchema = new Schema({
    favoriteCharacters:  {
        type:String,
        default : ' ',
    },    
    favoriteEpisodes:  {
        type:String,
        default : ' ',
    },    
    favoriteQuotes: {
        type:String,
        default : ' ',
    }   
},{
    timestamps: true
}
);

module.exports = mongoose.model('Profile', profileSchema);