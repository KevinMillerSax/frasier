const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const commentsSchema = new Schema({
    content: String,
    userName: String
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
    cast: [{type: Schema.Types.ObjectId, ref: 'Actor'}],
    comments: [commentsSchema],
},{
    timestamps: true
}
);

module.exports = mongoose.model('Episode', episodeSchema);