const express = require('express');
const router = new express.Router();

const apiController = require('../controllers/api-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/', authMiddleware.isAuthenticated, apiController.uploadImage);
router.get('/', authMiddleware.isAuthenticated, apiController.getImages);
router.delete('/:imageId', authMiddleware.isAuthenticated, apiController.deleteImage);

module.exports = router;