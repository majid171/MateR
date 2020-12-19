const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/user-model');

exports.config = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(null, user);
        });
    });

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL}/auth/google/callback`,
            profileFields: ['id', 'emails', 'name']
        }, async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({ id: profile.id })
                .catch((err) => {
                    console.log(err);
                });

            const date = Date.now();

            if (!user) {
                user = await new User({
                    id: profile.id,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    email: profile.email,
                    created: date,
                    lastLoggedIn: date
                });
            }
            else {
                user.lastLoggedIn = date;
            }

            user.save()
                .catch(err => {
                    console.log(err);
                });

            done(null, user);
        })
    );
}