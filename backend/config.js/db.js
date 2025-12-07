
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
     console.log("Connected DB Name →", mongoose.connection.name);
    console.log("MongoDB URI →", process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = {connectDB};
// exports.connectDB = connectDB;
