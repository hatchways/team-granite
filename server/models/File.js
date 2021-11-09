const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  cloudinaryId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FileModel = mongoose.model("file", imageSchema);

const imageSchema = new mongoose.Schema({});

module.exports = ImageModel = FileModel.discriminator("image", fileSchema);
