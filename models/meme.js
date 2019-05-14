const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const memeCommentsSchema = new Schema({
    content: String,
    userName: String
},{
    timestamps: true
}
);

const memesSchema = new Schema({
    photo: String,
    comments: [memeCommentsSchema],
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model('Meme', memesSchema);