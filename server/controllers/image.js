const Image = require("../models/Image");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { cloudinaryUpload } = require("../cloudinary");
const userId = null;

const helperUploadImages = async (res, files, req) => {
  const images = [];
  const uploadedImageData = [];
  const userId = null;

  for (let file of files) {
    const imageData = await cloudinaryUpload(
      file.path,
      process.env.CLOUDINARY_DIR
    );
    if (!imageData) {
      res.status(500);
      throw new Error("File not uploaded to cloudinary.");
    }
    uploadedImageData.push(imageData);
  }

  if (req.user) {
    const userId = user.id;
  }

  for (let imageData of uploadedImageData) {
    images.push(
      await Image.create({
        userId: userId,
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
  const images = await helperUploadImages(res, req.files, req.user);
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
  const [image] = await helperUploadImages(res, [req.file], req.user);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePhoto: image.id },
    { new: true }
  );

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: { imageURI: image.url },
  });
});
