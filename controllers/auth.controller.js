var db = require('../db');
var md5 = require('md5');

module.exports.login = function (req, res) {
    res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email: email }).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            value: { email, password }
        });
        return;
    }

    var hasshedPassword = md5(password);

    if (user.password !== hasshedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            value: { email, password }
        });
        return;
    }

    // res.cookie('userID', user.id);
    res.cookie('userID', user.id, { signed: true });

    res.redirect('/users');
};