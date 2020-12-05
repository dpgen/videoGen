var cloudinary = require("../../node_modules/cloudinary-core/cloudinary-core")
  .v2;
// var lodash = require("lodash");

global.uploadMedia = function () {
  cloudinary.config({
    cloud_name: "toblinkz",
    api_key: "345396669998471",
    api_secret: "_4zC88wBoZ_68fQZL0Ns4LyiUAg",
  });

  console.log(
    "** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **"
  );

  // File upload
  cloudinary.uploader.upload(url, function (error, result) {
    console.log(result, error);
  });

  console.log(cloudinary);
};
