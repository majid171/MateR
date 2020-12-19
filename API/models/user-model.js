const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    created: {type: Date, required: true},
    lastLoggedIn: {type: Date, required: true}
});

const User = mongoose.model('user', userSchema);

module.exports = User;
