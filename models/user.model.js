var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: String,
    phone: String,
    password: String,
    avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;