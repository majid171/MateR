const express = require('express');
const app = express();

require('dotenv').config();
require('./utilities/mongo-config');

const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const passport = require('passport');
const passportConfig = require('./utilities/passport-config');
const router = require('./routes/auth-route');
passportConfig.config(passport);

const routes = {
    auth: require('./routes/auth-route'),
    api: require('./routes/api-route'),
    s3: require('./routes/s3-route')
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cookieSession({
    keys: [process.env.COOKIE_KEY]
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With', 'content-type');
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
app.use('/api', routes.api);
app.use('/s3', routes.s3);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});