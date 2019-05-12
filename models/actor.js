const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    photo: String,
    name: String,
    character: String,
    bio: String,
},{
    timestamps: true
}
);

module.exports = mongoose.model('Actor', actorSchema);