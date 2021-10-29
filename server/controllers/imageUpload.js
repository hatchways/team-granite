const ImageModel = require("../models/Image");
const asyncHandler = require("express-async-handler");
const { cloudinary_upload } = require("../cloudinary");

// @route POST /image_upload
exports.uploadImages = asyncHandler(async (req, res, next) => {
  const isProfile = req.query.isProfile;
  const files = req.files;
  const uploadedImageData = [];

  let metadata = {};
  let imageModel = null;

  if (files === undefined) {
    res.status(400);
    throw new Error("File not uploaded");
  } else {
    for (let file of files) {
      const imageData = await cloudinary_upload(file.path, "Images");
      uploadedImageData.push(imageData);
    }

    if (isProfile !== undefined) {
      metadata = {
        isProfile: true,
      };
    }

    for (let imageData of uploadedImageData) {
      imageModel = await ImageModel.create({
        userId: req.user,
        cloudinaryId: imageData.id,
        url: imageData.url,
        metadata: metadata,
      });
    }

    res.status(200).json({
      success: "ImageUploded!",
    });
  }
});
