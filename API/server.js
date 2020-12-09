const express = require('express');
const app = express();

require('dotenv').config();
require('./utilities/mongo-config');

const cors = require('cors');

const passport = require('passport');
const passportConfig = require('./utilities/passport-config');
passportConfig.config(passport);

const routes = {
    auth: require('./routes/auth-route'),
}

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

// Routes
app.use('/auth', routes.auth);

// TEMP
app.get('/', (req, res) => {
    res.send('yo');
})

// Temp
app.get('/bad', (req, res) => {
    res.send('Auth Failure');
})

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});