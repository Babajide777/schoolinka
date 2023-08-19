import User from "../models/userModel";

interface IFindByEmail {
  email: string;
}
const findUserByEmail = async ({
  email,
}: IFindByEmail): Promise<[boolean, object | unknown]> => {
  try {
    const theUser = User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    console.log(theUser);
    return theUser ? [true, theUser] : [false, "No user found"];
  } catch (error) {
    return [false, { error }];
  }
};

export { findUserByEmail };
