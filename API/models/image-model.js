const mongoose = require('mongoose');
const User = require('./user-model');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    userId: {type: String, required: true},
    url: {type: String, required: true},
    createdDate: {type: Date, required: true}
});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;
