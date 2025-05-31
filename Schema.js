const joi = require("joi");
const Review = require("./modules/reviews");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(), // Fixed typo here
        price: joi.number().required(),
        country: joi.string().required(),
        location: joi.string().required(),
    }).required(),
});
module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required(),
        comment:joi.string().required(),
    }).required(),
});