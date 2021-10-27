const ImageModel = require("../models/Image");
const asyncHandler = require("express-async-handler");
const { cloudinary_upload } = require("../cloudinary")
const fs = require('fs');


// @route POST /image_upload
// @desc Search for users
// @access Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
  const isProfile = req.query.isProfile

  const files = req.files
  const uploadedImageData = []

  if (files === undefined){
    res.status(400)
    throw new Error("File not uploaded")
  } else {
    for (let file of files){
      const imageData = await cloudinary_upload(file.path, 'Images')
      uploadedImageData.push(imageData)
  }
  
    if(isProfile !== undefined){
      metadata = {
        isProfile:true
      }
    } else {
      metadata = {}
    }

    let user_id = null
  
    if (req.user !== undefined){
      user_id = req.user.id
    } 
  
    for (let imageData of uploadedImageData){
      
      ImageModel.create({
        user_id: user_id,
        cloudinary_id: imageData.id,
        url: imageData.url,
        metadata: metadata
      })
    }
  
    res.status(200).json({
      "success": "ImageUploded!"
    })
  }
});
