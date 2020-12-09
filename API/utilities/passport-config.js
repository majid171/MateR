const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user-model');

passportLoginHelper = async (id, firstName, lastName, email) => {
    let user = await User.findOne({ id: id })
        .catch(err => {
            console.error(err);
        }
        );

    if (!user) {
        user = new User({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email
        }).save()
            .catch(err => {
                console.error(err);
                return done(err);
            });
    }

    return user;
}

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
            callbackURL: `${process.env.API_URL}/auth/google/callback`,
            profileFields: ['id', 'emails', 'name']
        }, async (accessToken, refreshToken, profile, done) => {
            let user = passportLoginHelper(profile.id, profile.given_name, profile.family_name, profile.email);
            return done(null, user);
        })
    );

    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
            profileFields: ['id', 'emails', 'name']
        }, (accessToken, refreshToken, profile, done) => {
            let user = passportLoginHelper(profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value);
            return done(null, user);
        })
    );
}