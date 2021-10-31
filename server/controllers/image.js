const Image = require("../models/Image");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { cloudinaryUpload } = require("../cloudinary");

// Can accept null user
const helperUploadImages = async (res, files, user) => {
  const images = [];

  for (let file of files) {
    const imageData = await cloudinaryUpload(
      file.path,
      process.env.CLOUDINARY_DIR
    );
    if (!imageData) {
      res.status(400);
      throw new Error("File not uploaded to cloudinary.");
    }
    uploadedImageData.push(imageData);
  }

  for (let imageData of uploadedImageData) {
    images.push(
      await Image.create({
        userId: user,
        cloudinaryId: imageData.id,
        url: imageData.url,
      })
    );
  }

  return images;
};

// @route POST /image
// @desc Upload any number of images
// @access Public
exports.uploadImages = asyncHandler(async (req, res, next) => {
  await helperUploadImages(res, req.files, req.user);
  res.status(200).json({
    success: "Images uploaded.",
  });
});

// @route POST /image/profile
// @desc Upload profile photo
// @access Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  const [image] = await helperUploadImages(res, [req.file], req.user);

  await User.findByIdAndUpdate(req.user.id, { profilePhoto: image });

  res.status(200).json({
    success: "Profile photo uploaded.",
  });
});
