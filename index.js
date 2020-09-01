require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');

var userRoute = require('./routers/users.route');
var authRouter = require('./routers/auth.route');
var productRouter = require('./routers/products.route');
var cartRouter = require('./routers/cart.route');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

process.env.localDB = true;

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connect Atlas database successfully');
        process.env.localDB = false;
    })
    .catch((error) => {
        console.log('connect Atlas mongoDB fail');
        console.log(error);
        mongoose.connect(process.env.MONGODB_LOCAL_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
            .then(() => {
                console.log('connect local database successfully');
            })
            .catch((error) => {
                console.log('connect local database fail');
                console.log(error);
            });
    });

// mongoose.connect(process.env.MONGODB_LOCAL_URI, {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
//     .then(() => {
//         console.log('connect local database successfully');
//     })
//     .catch((error) => {
//         console.log('connect local database fail');
//         console.log(error);
//     });

var app = express();

var port = process.env.PORT || 3000;

// app.set('view engine', 'pug');
// app.set('views', './views')

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(cookieParser(process.env.SESSION_SECRET));
// app.use(sessionMiddleware);
// // app.use(cookieParser());

// app.use(express.static('public'));

// app.get('/', authMiddleware.requireAuth, function (req, res) {
//     res.render('layouts/header.pug');
// });

// app.use('/users', authMiddleware.requireAuth, userRoute);
// app.use('/products', authMiddleware.requireAuth, productRouter);
// app.use('/auth', authRouter);
// app.use('/cart', cartRouter);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});