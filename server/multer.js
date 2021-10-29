const multer = require("multer");
const randomString = require("randomstring");
const fs = require("fs");

const directory = "./image_uploads";

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image_uploads");
  },

  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").slice(-1)[0];
    cb(null, randomString.generate(20) + "." + extension);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only Images Allowed!"));
  }
};

exports.imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
});
