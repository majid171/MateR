const express = require('express');
const router = new express.Router();

const s3Controller = require('../controllers/s3-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/', authMiddleware.isAuthenticated, s3Controller.getPreSignedURL);

module.exports = router;