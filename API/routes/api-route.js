const express = require('express');
const router = new express.Router();

const apiController = require('../controllers/api-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/upload', authMiddleware.isAuthenticated, apiController.uploadImage);

module.exports = router;