const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');

// AWS configuration
aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

exports.multerMiddleware = multer({
  dest: 'temp/uploads/',
  limits: { fieldSize: 8 * 1024 * 1024 },
  fileFilter,
}).single('image');

exports.upload = (filePath, originalName, mimetype) => new Promise((resolve, reject) => {
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fs.createReadStream(filePath),
    Key: `products/${originalName}`,
    ContentType: mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return reject(
        new Error('Error occured while trying to upload to S3 bucket'),
      );
    }

    // Empty temp folder
    fs.unlinkSync(filePath);

    const imageUrl = data.Location;
    return resolve(imageUrl);
  });
});
