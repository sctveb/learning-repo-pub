const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'my info', user: null});
});

router.get('/join', (req, res) => {
    res.render('join', {
        title: 'sign up',
        user: null,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    res.render('main', {
        title: 'nodebird',
        twits: [],
        user: null,
        loginError: req.flash('loginError'),
    });
});

module.exports = router;