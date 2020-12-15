const express = require('express');
const router = new express.Router();
const passport = require('passport');

const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/google', authController.GoogleAuth);
router.get('/google/callback', authController.GoogleAuthCallback, authController.redirectToHome);

router.get('/signout', authMiddleware.isAuthenticated, authController.signOut);
router.get('/verify', authMiddleware.isAuthenticated, authController.checkIfAuth);

module.exports = router;