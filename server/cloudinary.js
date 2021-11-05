const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.cloudinaryUpload = (filePath, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      {
        resource_type: "auto",
        folder: folder,
      },
      (_, result) => {
        if (!result) {
          reject(null);
        } else {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
        fs.unlinkSync(filePath);
      }
    );
  });
};
