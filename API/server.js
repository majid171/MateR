const express = require('express');
const app = express();

require('dotenv').config();
require('./utilities/mongo-config');

const cors = require('cors');

const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const passportConfig = require('./utilities/passport-config');
passportConfig.config(passport);

const routes = {
    auth: require('./routes/auth-route'),
}

app.use(cookieSession({
    keys: [process.env.COOKIE_KEY],
}))
app.use(cookieParser());


app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

// Routes
app.use('/auth', routes.auth);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});