var db = require('../db');
var User = require('../models/user.model');
const shortId = require('shortid');
const { use } = require('../routers/auth.route');
const e = require('express');

module.exports.index = async function (request, response) {
    // if (process.env.localDB) {
    response.render('users/index-users-pug', {
        users: db.get('users').value()
    });
    User.find().then(function (users) {
        response.render('users/index-users-pug', {
            users: users
        });
    });
    // }
    // else {
    //     var users = await User.find();
    //     // var users = [];
    //     response.render('users/index-users-pug', {
    //         users: users
    //     });
    // }
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
    req.body.id = shortId.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users');
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