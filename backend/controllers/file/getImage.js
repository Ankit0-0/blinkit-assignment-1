import User from '../../models/user.js'

const getUserFiles = async (req, res) => {
  console.log('fetch images hit');
  try {
    const { userID } = req.body;
    const user = await User.findById(userID);
    const files = user.images;
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export default getUserFiles;
