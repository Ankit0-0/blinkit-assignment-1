import User from "../../models/user.js";
import cloudinary from "cloudinary";
import fs from "fs";
async function uploadFileToCLoudinary(img, folder) {
  const options = { folder };

  try {
    const response = await cloudinary.v2.uploader.upload(
      img.tempFilePath,
      options
    );

    return response;
  } catch (error) {
    return false;
  }
}

const uploadImage = async (req, res) => {
  const { image } = req.files;

  const extension = image.name.split(".");

  const name = Date.now();

  req.files.image.mv(`uploads/${name}.${extension[1]}`); // move the file to the uploads folder
  req.files.image.tempFilePath = `uploads/${name}.${extension[1]}`; // set the tempFilePath to the new path

  try {
    const resp = await uploadFileToCLoudinary(image, "blinkit");

    const assetURL = resp.url;
    const assetPublicId = resp.public_id;

    const userId = req.body.userID;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "User not found",
      });
      return;
    }
    user.images.push(assetURL);
    await user.save();

    // Delete the file from the "uploads" folder
    fs.unlinkSync(`uploads/${name}.${extension[1]}`);

    res.status(200).json({
      success: true,
      msg: "File uploaded to Cloudinary",
      assetURL: assetURL,
      assetPublicId: assetPublicId,
    });
  } catch (err) {
    console.log("err-> ", err);
  }
};

export default uploadImage;
