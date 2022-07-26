const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
// This middleware parses incoming requests and extracts incoming data that might be
// attached to that request. "application/x-www-form-urlencoded" is the enctype we used
// up to this point when submitting forms. That's why it say urlencoded here.
// This doesn't support multi-part form data that does include files like images.
// Now we need to add "multipart/form-data" enctype as the middleware
// But there's no built in middleware for multi-part form data. So we need to use a third party package.
// We can use "multer" 3rd party package for that.
// But we're not applying it to all incoming requests, instead we're only apply it to
// the routes where we do expect files to be uploaded.

app.use(express.static("public"));
app.use("/images", express.static("images"));
// This will make the "images" folder available to be served to users.
// So that we could serve back not only the css files, but also the images on the profiles.ejs file.
// "/images" is a path filter that is used on this middleware
// That means that this middleware will now only become active if a request reaches the server
// that has a path that starts with "/images"
// express.static("images") will only serve the "file names" of the files inside the images folder.
// but the request sent through the src= attribute on profiles.ejs is sent also with the /images path name 
// images\\1658320453739-thomas shelby quotes 11.jpg
// So in order to the request to work correctly, we need to add "/images" to app.use()

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
