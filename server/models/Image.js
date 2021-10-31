const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
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
  metadata: {
    type: Object,
    default: {},
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Image = mongoose.model("image", imageSchema);
