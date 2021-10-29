const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.cloudinary_upload = (file_path, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file_path,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (result === undefined) {
          reject(error);
        } else {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
        fs.unlinkSync(file_path);
      }
    );
  });
};
