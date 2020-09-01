// var db = require('../db');
var User = require('../models/user.model');
var md5 = require('md5');

module.exports.login = function (req, res) {
    res.render('auth/login');
};

module.exports.postLogin = async function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;

    var user = await User.find({ userName: userName });

    // if (!user) {
    if (!user.length) {
        res.render('auth/login', {
            errors: [
                'User name does not exist.'
            ],
            value: { userName, password }
        });
        return;
    }

    var hasshedPassword = md5(password);
    if (user[0].password !== hasshedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            value: { userName, password }
        });
        return;
    }

    // res.cookie('userID', user[0].id);
    res.cookie('userID', user[0].id, { signed: true });

    res.redirect('/users');
};