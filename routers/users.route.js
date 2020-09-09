var express = require('express');
var multer = require('multer');
var router = express.Router();

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

// set up multer
var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);

router.get('/cookie', function (req, res, next) {
    res.cookie('user-id', 123456);
    res.send('Cookie');
});

router.get('/:userID', controller.get);

module.exports = router;