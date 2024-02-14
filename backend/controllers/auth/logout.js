import jwt from "jsonwebtoken";

export const logoutController = (req, res) => {
  try {
    // Clear the userCookie by setting it to an empty string and setting an immediate expiration
    res.cookie("userCookie", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });

    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in logout",
      error: error.message,
    });
  }
};
