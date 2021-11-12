const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { uploadImages } = require("../controllers/imageUpload");
const { imageUpload } = require("../multer");

router.route("/").post(imageUpload.array("images", 10), uploadImages);

module.exports = router;
