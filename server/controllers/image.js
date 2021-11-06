const Image = require("../models/Image");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { cloudinaryUpload } = require("../cloudinary");

const helperUploadImages = async (files, user) => {
  const images = [];
  const uploadedImageData = [];
  let userId = null;

  for (let file of files) {
    const imageData = await cloudinaryUpload(
      file.path,
      process.env.CLOUDINARY_DIR
    );
    if (!imageData) {
      return null;
    }
    uploadedImageData.push(imageData);
  }

  if (user) {
    userId = user.id;
  }
  for (let imageData of uploadedImageData) {
    const image = await Image.create({
      userId: userId,
      cloudinaryId: imageData.id,
      url: imageData.url,
    });

    images.push(image);
  }

  return images;
};

// @route POST /image
// @desc Upload any number of images
// @access Public
exports.uploadImages = asyncHandler(async (req, res, next) => {
  const images = await helperUploadImages(req.files, req.user);

  if (!images) {
    res.status(400);
    throw new Error("File not uploaded to cloudinary.");
  }

  const imageURIs = [];
  images.map((image) => {
    imageURIs.push(image.url);
  });
  res.status(200).json({
    success: { imageURIs },
  });
});

// @route POST /image/profile
// @desc Upload profile photo
// @access Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const images = await helperUploadImages([req.file], user);

  if (!images) {
    res.status(400);
    throw new Error("File not uploaded to cloudinary.");
  }

  user.profilePhoto = images[0].id;
  await user.save();

  res.status(200).json({
    success: { imageURI: images[0].url },
  });
});
