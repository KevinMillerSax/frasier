const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
name: String,
googleId: String
},{
    timestamps: true
});

module.exports = mongoose.model('Fan', fanSchema);