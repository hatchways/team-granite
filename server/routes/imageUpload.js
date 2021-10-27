const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { uploadImages } = require('../controllers/imageUpload');
const { image_upload } = require('../multer')

//Will add protected during integration.
router.route('/').post(image_upload.array('images', 10), uploadImages);

module.exports = router;