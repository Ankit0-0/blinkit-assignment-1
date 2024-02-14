import express from "express";
import uploadImage from "../controllers/file/uploadImage.js";
import getUserFiles from "../controllers/file/getImage.js";
// import multerMiddleware from "../middleware/multer.js";
import fetchUser from "../middleware/jwt.js";
const router = express.Router();

router.post("/upload", fetchUser, uploadImage);

router.get("/fetch", fetchUser, getUserFiles);

export default router;
