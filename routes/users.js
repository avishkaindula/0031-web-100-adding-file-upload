const express = require("express");

const multer = require("multer");

const upload = multer({});
// We need to execute multer as a function first like this.
// To this function, we need to pass a configuration object. {}
// We can configure the behavior of multer through that.
// For example, where it should store the files.
// This will now give us a middleware named "upload"
// Now we can apply this middleware to the route that handles the image upload.

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

  const userData = req.body;
  // This will hold the username that was submitted through the form
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
