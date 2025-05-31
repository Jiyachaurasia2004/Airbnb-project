const express = require("express");
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../modules/listing.js");
const Review = require("../modules/reviews.js");
const {isLoggedIn,isowner,validatelisting} = require("../middleware.js")
const listingcontroller = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} =require("../cloudinaryconfig.js")
const upload = multer({ storage })
// index route and create route
Router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(isLoggedIn,upload.single('listing[image]'),
     validatelisting, wrapAsync(listingcontroller.createlisting))
  
//new routes
Router.get("/new",isLoggedIn,listingcontroller.randernewfrom);


//Show routes , update and delete
Router.route("/:id")
   .get(wrapAsync(listingcontroller.showlisting))
   .put(isLoggedIn,isowner,upload.single('listing[image]'),
       validatelisting,
       wrapAsync(listingcontroller.updatelisting))
    .delete(isLoggedIn,isowner,wrapAsync( listingcontroller.Destroylisting));

// edit routes
Router.get("/:id/edit",isLoggedIn,isowner,listingcontroller.editlisting);


module.exports = Router;