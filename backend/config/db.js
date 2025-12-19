
import pkg from "mongoose";
const { connect, connection } = pkg;
import { config } from "dotenv";

config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
     console.log("Connected DB Name →", connection.name);
    console.log("MongoDB URI →", process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default {connectDB};
// exports.connectDB = connectDB;
