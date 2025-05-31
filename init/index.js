const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");



main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlund");
}

const initDB = async () => {
  initData.data = initData.data.map((obj) => ({...obj, owner: "683584b334a5258d20e54163"}));
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();