import mongoose from "mongoose";

import dotenv from "dotenv";
// configure env
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// const ConnectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }

const connectToMongoose = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected successfully");
    })
    .catch((e) => {
      console.log("error : ", e);
    });
};

export default connectToMongoose;
