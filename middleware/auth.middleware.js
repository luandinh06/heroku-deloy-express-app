// var db = require('../db');
var User = require('../models/user.model');

module.exports.requireAuth = async function (req, res, next) {
    if (!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    };

    // var user = db.get('users').find({ id: req.signedCookies.userID }).value();
    var user = await User.find({ _id: req.signedCookies.userID });

    // if (!user) {
    if (!user.length) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user[0];

    next();
};