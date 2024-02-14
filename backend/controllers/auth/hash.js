import bcrypt from "bcrypt";

// This function is used to encrypt the password (this is provided by the  bcrypt library)
export const hashPassword = async (password) => {
  try {
    const SaltRounds = 10;
    const HashedPassword = await bcrypt.hash(password, SaltRounds);
    return HashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// this function is used to decrypt the password (this is provided by the bcrypt library)
export const comparePassword = async (password, HashedPassword) => {
  try {
    return bcrypt.compare(password, HashedPassword);
  } catch (error) {
    console.log(error);
  }
};

