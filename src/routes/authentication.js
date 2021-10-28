const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { isLoggedIn, notLoggedIn } = require('../lib/auth');

router.get('/signup', notLoggedIn, async (req, res) => {
    res.render('auth/signup.hbs');
});

/*router.post('/signup', async (req, res) => {   
    passport.authenticate('local.signup', { //toma el modulo creado
        successRedirect : '/profile', //DICE A DONDE SE VA ENVIAR CUANDO TODO FUNCIONA
        failureRedirect: '/signup', // SE EJECUTA CUANDO ALGO FALLA
        failureFlash : true // MENSAJE SI ALGO FALLA
    })                                              
        
    res.redirect('/signup');
});*/

router.post('/signup', notLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.hbs')
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

router.get('/signin', notLoggedIn, (req, res) => {
    res.render('auth/signin.hbs');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

module.exports = router;

