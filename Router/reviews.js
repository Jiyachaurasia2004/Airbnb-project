const express = require("express");
const Router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema} = require("../Schema.js")
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../modules/reviews.js");
const Listing = require("../modules/listing.js");
const {validateReviwes,isLoggedIn,isauthor} = require("../middleware.js")



// Reviews route
// post route
Router.post("/",isLoggedIn,validateReviwes,wrapAsync(async(req,res)=>{
 const listing = await Listing.findById(req.params.id);
     const newreviwes = new Review(req.body.review);
      newreviwes.author = req.user._id;
      console.log(newreviwes);
      listing.reviews.push(newreviwes);
      // res.send("successful reviews");
      
      await newreviwes.save();
      await listing.save();
       req.flash("success"," new Reviews created");
      console.log("save reviers",newreviwes)
      res.redirect(`/listing/${listing._id}`);
    
      
}));

// Delete Reviews route
Router.delete("/:reviewId",isLoggedIn,isauthor,wrapAsync(async(req,res)=>{
   let {id ,reviewId} = req.params;

   await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","Reviews deleted");
   res.redirect(`/listing/${id}`);
}));

module.exports = Router;