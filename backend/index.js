import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import {cloudinaryConnect} from "./config/cloudinary.js";
// configure env
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

import authRoute from "./routes/auth.js";
import fileRoute from "./routes/file.js";


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'uploads/'
}))

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// app.use(bodyParser. text({type: '/'}));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// database connection
import connectToMongoose from "./config/db.js";
import singleUpload from "./middleware/multer.js";
await connectToMongoose();
await cloudinaryConnect();
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/images",  fileRoute);

app.get("/", (req, res) => {
  console.log("Default\n");
  res.send("Default");
});

app.listen(port, () => {
  console.log("listening on port 8000");
});
