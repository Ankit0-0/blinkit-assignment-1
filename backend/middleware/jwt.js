import jwt from "jsonwebtoken";

import User from "../models/user.js"; 

const fetchUser = (req, res, next) => {
  const accessToken = req.cookies && req.cookies.userCookie;
  console.log("jwt hit");

  if (!accessToken) {
    return res.status(401).json({
      succes: false,
      message: "Access token not found",
    });
  }

  try {
    const jwt_secret = process.env.JWT_SECRET;
    const payload = jwt.verify(accessToken, jwt_secret, { complete: true });
    
    const user = User.findById(payload.userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.body.userID = payload.payload.userID;

    console.log("next");
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export default fetchUser;