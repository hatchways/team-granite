const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { uploadImages, uploadProfilePhoto } = require("../controllers/image");
const { imageUpload } = require("../multer");

const profileUploader = imageUpload.single("profilePhoto");
const imageUploader = imageUpload.array("images", 10);

router.route("/").post(imageUploader, uploadImages);

router.route("/profile").post(protect, profileUploader, uploadProfilePhoto);

module.exports = router;
