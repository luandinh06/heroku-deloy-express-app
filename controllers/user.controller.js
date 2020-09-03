var db = require('../db');
var User = require('../models/user.model');
const shortId = require('shortid');
const { use } = require('../routers/auth.route');
var md5 = require('md5');

module.exports.index = async function (request, response) {
    var users = await User.find();
    response.render('users/index-users-pug', {
        users: users
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var users = db.get('users').value();
    var matchedUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index-users-pug', {
        users: matchedUsers,
        searchValue: q
    })
};

module.exports.create = function (req, res) {
    // console.log(req.cookies);
    res.render('users/create');
};

module.exports.postCreate = function (req, res) {
    var userInfo = {};
    try {
        try {
            req.body.avatar = req.file.path.split('\\').slice(1).join('/');
        } catch (error) {
            req.body.avatar = '';
            console.log('error req.file.path');
        }
        userInfo = req.body;
        // console.log(userInfo.userName);
        // db.get('users').push(req.body).write();

        var user = new User({
            userName: userInfo.userName,
            phone: userInfo.phone,
            password: md5(userInfo.password),
            avatar: userInfo.avatar
        });

        user.save(function (err, user) {
            if (err) return console.error(err);
        });
        res.redirect('/users');
    } catch (error) {
        console.log('Error: save user in database');
    }
};

module.exports.get = function (req, res) {
    var id = req.params.userID;
    var user = db.get('users').find({ id: id }).value();
    if (!user) res.send('the user do not exist');
    else {
        res.render('users/view', {
            user: user
        });
    }
}