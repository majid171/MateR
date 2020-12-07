const passport = require('passport');

// Google OAuth2
exports.GoogleAuth = passport.authenticate('google', {scope: ['openid', 'profile', 'email']});
exports.GoogleAuthCallback = passport.authenticate('google');

// Facebook OAuth2
exports.FacebookAuth = passport.authenticate('facebook', {scope: ['email', 'public_profile']});
exports.FacebookAuthCallback = passport.authenticate('facebook');

// Redirecting to home
exports.redirectToHome = (req, res) =>{
    res.redirect('/');
}