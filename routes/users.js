const express = require("express");

const multer = require("multer");

const storageConfig = multer.diskStorage({
  // This is a method we can execute which create a new storage object.
  // Now we need to pass an object to diskStorage and in this object, we can specify
  // a destination key and a filename key
  destination: function (req, file, cb) {
    cb(null, "images");
    // cb = callback
    // cb() is a function
    // cb will pass the configurations chosen by us back to multer.
    // Now we need to pass two values to this function.
    // The first value is a potential error we might have if something went wrong with generating the destination.
    // There won't be any errors here as we hard code the destination. So we should set the first value as "null"
    // We need to provide the "destination path" as the second value.
    // In this case the images will be stored in the "images" folder. 
    // Therefor the path is just "images" relative to users.js
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    // This function will rename the uploaded files to "our likings" rather than using
    //  the default ones provided by multer. So we can also have the extension of the file that was uploaded.
    // The first value is a potential error we might have if something went wrong with generating the destination.
    // There won't be any errors here as we hard code the destination. So we should set the first value as "null"
    // Now we need to pass the filename as the second value.
    // Now we can concatenate and create a new file name for uploaded images
    // file.originalname will give us the original name of the jpeg ex=> thomas shelby quotes 2.jpg
    // This originalname also holds the file extension. That's the thing we want.
    // Date.now() will give the current time of the file uploading task in "milliseconds"
    // It's actually the milliseconds that has passed upto that point starting from 01/01/1970
    // Therefor this will hopefully give us a unique name for each and every file that was uploaded.
    // cb will basically returns the filename we chose for the uploaded file back to multer.
  },
});

// const upload = multer({ dest: "images" });
// We need to execute multer as a function first like this.
// To this function, we need to pass a configuration object. {}
// We can configure the behavior of multer through that.
// For example, where it should store the files.
// This will now give us a middleware named "upload"
// Now we can apply this middleware to the route that handles the image upload.
// We should define the path where the uploaded file goes by using dest: images
// Now the uploaded files will be stored in the images folder.
// Multer will automatically rename the uploaded files into a unique id to.

const upload = multer({ storage: storageConfig });
// This is how we tell multer in detail how the uploaded files should be stored.
// (by using storage: instead of dest:)
// We can specify the file extension by using this.
// (We don't get the file extension if we used dest: instead)
// storage will hold a complete storage object that contains detailed instructions about the
// path and the filename. We can pass those values through the constant we created named storageConfig.
// So now this will save the uploaded files with also the "file extension."
// new path => images\\1658320453739-thomas shelby quotes 11.jpg

const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), function (req, res) {
  const uploadedImageFile = req.file;
  // This will hold the image JPG that was submitted
  // req.file is an object that gives us extra file information like the path where the files are stored.

  const userData = req.body;
  // This will hold the username that was submitted through the form

  console.log(uploadedImageFile);
  // result==========================================================
  // {
  //   fieldname: 'image',
  //   originalname: 'thomas shelby quotes 11.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'images',
  //   filename: '9fd305ea1adf16570af9e9101a6ea9ed',
  //   path: 'images\\9fd305ea1adf16570af9e9101a6ea9ed',
  //   size: 51367
  // }

  console.log(userData);
  // result===========================================================
  // { username: 'Avishka Indula' }

  res.redirect("/");
});
// This is the route we create to accept the file uploads
// So we need to apply the multer middleware to this route.
// This route accepts the input set through the form on new-user.ejs
// We can apply the "upload" middleware to this router like this => upload.single("image"),
// .single means we're expecting a single file to be uploaded.
// Then we should add the "name" of the input field defined on the form on new-user.ejs to it
// In the new-user.ejs the input field that holds the image has the name attribute of => name="image"
// We can add an unlimited list of middleware functions. We can separate them by comas.
// (the function at the last of this route is also a middleware function)
// The order of this middleware functions matter as the functions executes from left to right.

module.exports = router;
