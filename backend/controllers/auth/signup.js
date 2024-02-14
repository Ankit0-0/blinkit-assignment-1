import user from "../../models/user.js";
import { hashPassword } from "../auth/hash.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const regiserController = async (req, res) => {
  console.log('signup hit');
  try {


    const { email, password } = req.body;
    console.log({ email, password });

    // Check if the user already exists(check by unique email)
    let existingUser = await user.findOne({ email });

    // return an error if the user already exists
    if (existingUser) {
      return res.status(400).send({
        succes: false,
        message: "email already in use",
      });
    }

    // hash the password for security
    const HashedPassword = await hashPassword(password);

    // create a new user
    const newUser = await new user({
      email: email,
      password: HashedPassword,
    }).save();

    const payload = {
      userID: newUser._id,
    };

    const jwt_secret = process.env.JWT_SECRET;

    let authToken = jwt.sign(payload, jwt_secret);

    const expdate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieOptions = {
      expires: expdate,
      sameSite: "none",
      secure: true,
      httpOnly: false,
    };

    res.cookie("userCookie", authToken, cookieOptions);

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false,
      message: "Error in Registration",
      error: error.message,
    });
  }
};

export default regiserController;
