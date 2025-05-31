
const Listing = require("../modules/listing.js");
const { listingSchema} = require("../Schema.js")
module.exports.index = async (req,res)=>{
  const allListing = await Listing.find({});
  res.render("listing/index.ejs",{allListing});
  
}


module.exports.randernewfrom = (req,res)=>{
    res.render("listing/new.ejs");
}

module.exports.createlisting = async(req,res,next)=>{
  let url = req.file.path;
  let filename = req.file.filename;
  let result1 =  listingSchema.validate(req.body);
  console.log(result1);
  const newListing = new Listing(req.body.listing);
  newListing.image = {url,filename};
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success","create new listing");
  res.redirect("/listing");
}

module.exports.editlisting = async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
   if(!listing){
    req.flash("error","Listing you requested does not exit");
    return res.redirect("/listing")
  }
  let OrginialImageUrl = listing.image.url;
  let OrignialImageUrl= OrginialImageUrl.replace("/upload","/upload/w_300,w_250")
  res.render("listing/edit.ejs", { listing,OrignialImageUrl });
}

module.exports.showlisting = async(req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id).
  populate({
    path: 'reviews',
     populate:{
      path:'author'
    },
    })
    .populate('owner');
  if(!listing){
    req.flash("error","Listing you requested does not exit");
    return res.redirect("/listing")
  }
  console.log(listing);
  res.render("listing/show.ejs", { listing });
  
}
module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file != "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
  }
   req.flash("success","listing Updated");
  res.redirect(`/listing/${id}`);
}

module.exports.Destroylisting =async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
   req.flash("success","listing Deleted");
  res.redirect("/listing");
}