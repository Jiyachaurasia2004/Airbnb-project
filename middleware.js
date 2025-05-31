const Listing = require("./modules/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema,listingSchema} = require("./Schema.js")
const Review = require("./modules/reviews.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.orginialUrl;
    req.flash("error", "You must be logged in to create listing");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(  req.session.redirectUrl){
        res.locals.redirectUrl =   req.session.redirectUrl;
    }
    next();
}

module.exports.isowner = async(req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.curruser._id)){
    req.flash("error","you are not the owner of this listing")
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.validatelisting=(req, res, next)=> {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,msg); 
    } else {
        next(); 
    }
}

module.exports.validateReviwes = (req, res, next)=> {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,msg);
    } else {
        next(); 
    }
}

module.exports.isauthor = async(req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.curruser._id)){
    req.flash("error","you are not the author of this listing")
    return res.redirect(`/listing/${id}`);
  }
  next();
}