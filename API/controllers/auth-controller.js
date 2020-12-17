const passport = require('passport');

// Google OAuth2
exports.GoogleAuth = passport.authenticate('google', { scope: ['openid', 'profile', 'email'] });
exports.GoogleAuthCallback = passport.authenticate('google', { successRedirect: process.env.FRONTEND_URL });

// Signing out
exports.signOut = (req, res) => {
    res.clearCookie('express:sess.sig');
    res.clearCookie('express:sess');
    res.json('signed out');
}

// Redirecting to home
exports.redirectToHome = (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
}

exports.checkIfAuth = (req, res) => {
    res.json(true);
}