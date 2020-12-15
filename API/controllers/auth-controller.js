const passport = require('passport');

// Google OAuth2
exports.GoogleAuth = passport.authenticate('google', { scope: ['openid', 'profile', 'email']});
exports.GoogleAuthCallback = passport.authenticate('google', {successRedirect: process.env.FRONTEND_URL} );

// Signing out
exports.signOut = (req, res) => {
    console.log('made it here')
    req.logout();
    // req.session.destroy(() => {
    //     // res.redirect();
    //     console.log('testing');
    // });
}

// Redirecting to home
exports.redirectToHome = (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
}

exports.checkIfAuth = (req, res) => {
    res.json(true);
}