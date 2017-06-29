const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

// const controller = require('./controller');
const auth = require('../services/auth');

// ----------------------------------------
// users index

router.post(
    '/',
    // we want the behavior of the site to vary depending on whether or
    // not the user is already logged in. If they are logged in, we want
    // to send them to /users/profile. If they are not, we want to send
    // them to users/new.
    passport.authenticate(
        // The following string indicates the particular strategy instance
        // we'll want to use to handle signup. We defined behavior for
        // 'local-signup' back in index.js.
        'local-signup', {
            failureRedirect: '/user/new',
            successRedirect: '/user/show'
        }
    )
);

// ----------------------------------------
// register new user

router.get('/new', (req, res) => {
    res.render('user/new');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/user/login',
        successRedirect: '/user/show'
    }
));

// ----------------------------------------
// user profile

router.get(
    '/show',
    // Middleware (that we wrote) ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    (req, res) => {
        console.log('in handler for users/show');
        console.log('req.user:');
        console.log(req.user);
        User
            .findByEmail(req.user.email)
            .then((user) => {
                res.render(
                    'user/show', { user: user }
                );
            })
            .catch(err => console.log('ERROR:', err));
    }
);



module.exports = router;

