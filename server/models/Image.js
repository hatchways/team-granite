const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required: false,
  },
  cloudinary_id:{
    type:String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  metadata: {
    type: Map,
    of: String,
    default: {}
  },
  upload_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ImageModel = mongoose.model("image", imageSchema);