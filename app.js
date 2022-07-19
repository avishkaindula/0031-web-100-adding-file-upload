const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
app.use(express.static('public'));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
