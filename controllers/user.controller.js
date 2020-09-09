var db = require('../db');
var User = require('../models/user.model');
const shortId = require('shortid');
const { use } = require('../routers/auth.route');
var md5 = require('md5');

cloudinary = require('cloudinary').v2;

// set up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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

    userInfo = req.body;

    if (req.file) {
        cloudinary.uploader.upload(req.file.path, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                userInfo.avatar = result.secure_url;
            }

            var user = new User({
                userName: userInfo.userName,
                phone: userInfo.phone,
                password: md5(userInfo.password),
                avatar: userInfo.avatar
            });

            user.save(function (err, user) {
                if (err) {
                    // errorArray.push['error when save user in Mongo Atlas'];
                    console.log('error when upload in atlas');
                    // res.redirect('/users/create');;
                    res.redirect('/users');

                }
                else {
                    res.redirect('/users');
                }
            });
        });
    } else {
        userInfo.avatar = 'https://res.cloudinary.com/luandinh06/image/upload/v1599657695/ion3ypdmptrzvlsmpfho.jpg';

        var user = new User({
            userName: userInfo.userName,
            phone: userInfo.phone,
            password: md5(userInfo.password),
            avatar: userInfo.avatar
        });

        user.save(function (err, user) {
            if (err) {
                // errorArray.push['error when save user in Mongo Atlas'];
                console.log('error when upload in atlas');
                // res.redirect('/users/create');;
                res.redirect('/users');
            }
            else {
                res.redirect('/users');
            }
        });
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