const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth-controller');

router.get('/google', authController.GoogleAuth);
router.get('/google/callback', authController.GoogleAuthCallback, authController.redirectToHome);

router.get('/facebook', authController.FacebookAuth);
router.get('/facebook/callback', authController.FacebookAuthCallback, authController.redirectToHome);

module.exports = router;