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
    userName: String,
    photo: String,
    comments: [memeCommentsSchema],
    likes: [{type: Schema.Types.ObjectId, ref: 'Fan'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'Fan'}],
},{
    timestamps: true
}
);

module.exports = mongoose.model('Meme', memesSchema);