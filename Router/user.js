const express = require("express");
const Router = express.Router();
const User = require("../modules/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

Router.route("/users/signup")
    .get( reviewController.renderNewFrom)
    .post(
       saveRedirectUrl,
       wrapAsync(reviewController.signup)
);

Router.route("/users/login")
   .get( reviewController.renderLoginFrom)
   .post(
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  reviewController.login
);


Router.get("/logout", reviewController.logout);
module.exports = Router;
