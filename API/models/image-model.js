const mongoose = require('mongoose');
const User = require('./user-model');
const Schema = mongoose.Schema;

// const imageSchema = new Schema({
//     userId: {type: String, required: true},
//     fileName: {type: String, required: true},
//     created: {type: Date, required: true},
//     url: {type: String}
// });

const imageSchema = new Schema({
    userId: {type: String, required: true},
    fileName: {type: String, required: true},
    created: {type: Date, required: true},
    data: {type: String, required: true}
});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;
