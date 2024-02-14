import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  cloudinaryLink: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
