module.exports.postCreate = function (req, res, next) {
    var errors = [];

    if (!req.body.userName) {
        errors.push('User name is required');
    }
    if (!req.body.phone) {
        errors.push('Phone is required');
    }
    if (!req.body.password) {
        errors.push('Password is required');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            value: req.body
        });
        return;
    };

    next();
};