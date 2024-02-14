import user from "../../models/user.js";
import { comparePassword } from "../auth/hash.js";
import jwt from "jsonwebtoken";


export const logincontroller = async (req, res) => {
  console.log('login hit');
  try {
    const { email, password } = req.body;
    console.log({email, password});
    const ExistingUser = await user.findOne({ email });
    if (!ExistingUser) {
      return res.status(400).send({
        success: false,
        Esuccess: false,
        message: "Please enter a valid email.",
      });
    }
    
    const passwordCompare = await comparePassword(
      password,
      ExistingUser.password
    );

    if (!passwordCompare) {
        return res.status(400).send({
            success: false,
            Esuccess: false,
            message: "Invalid password",
        });
    }
 
    const payload = { 
      userID: ExistingUser._id
    }

    const jwt_secret = process.env.JWT_SECRET;

    let authToken = jwt.sign(payload, jwt_secret);

    const expdate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieOptions = { 
      expires: expdate,
      sameSite: "none",
      secure: true,
      httpOnly: false
    }

    res.cookie("userCookie",authToken ,cookieOptions);
    
    res.status(200).send({
        success: true,
      message: "login successful",
      user: {
        name: ExistingUser.name,
        email: ExistingUser.email,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};
