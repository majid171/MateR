const express = require('express');
const app = express();

require('dotenv').config();
require('./utilities/mongo-config');

const cors = require('cors');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const passportConfig = require('./utilities/passport-config');
passportConfig.config(passport);

const routes = {
    auth: require('./routes/auth-route'),
}

app.use(cookieParser());

app.use(session({
    secret: process.env.COOKIE_KEY,
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With', 'content-type');
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