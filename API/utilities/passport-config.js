const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

exports.config = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            callbackURL: `${process.env.HOST_NAME}/auth/google/callback`,
        }, async (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        })
    );

    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
            callbackURL: `${process.env.HOST_NAME}/auth/facebook/callback`
        }, (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            done(null, profile);
        })
    );
}