const multer = require('multer');
const randomString = require('randomstring')

//Can only be accessed if it is protected? //mmight remove need for thid
const image_storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, '/image_uploads')
    },

    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').slice(-1)[0]
      cb(null, randomString.generate(20)+extension)
    }
  })

const image_fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(new Error('Only Images Allowed!'))
    }
}
  
exports.image_upload = multer({storage:image_storage})