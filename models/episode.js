const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const commentsSchema = new Schema({
    content: String,
    userName: String,
    userId: {
        type: Schema.Types.ObjectId, ref: 'Fan',
    }
    
},{
    timestamps: true
}
);

const episodeSchema = new Schema({
    title: String,
    seasonNumber: Number,
    episodeNumber: Number,
    director: String,
    airDate: Date,
    synopsis: String,
   
    comments: [commentsSchema],
    likes: [{type: Schema.Types.ObjectId, ref: 'Fan'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'Fan'}],
},{
    timestamps: true
}
);

module.exports = mongoose.model('Episode', episodeSchema);