import { User } from "../entities/User";

const checkUnique = async (username: string): Promise<boolean> => {
  let user = await User.findOne({ where: { username } });

  return user ? false : true;
};

export const getUniqueUsername = async () => {
  const prefix = "Lancelot";
  let isUsernameUnique = false;

  while (!isUsernameUnique) {
    let suffix = Math.floor(100000 + Math.random() * 900000);
    let username = prefix + suffix;
    isUsernameUnique = await checkUnique(username).catch((err) => {
      throw err;
    });
    if (isUsernameUnique) return username;
    else return false;
  }
  return isUsernameUnique;
};
