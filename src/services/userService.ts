import User from "../models/userModel";

interface IFindByEmail {
  email: string;
}

interface ICreateAUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const findUserByEmail = async ({
  email,
}: IFindByEmail): Promise<[boolean, any]> => {
  try {
    const theUser = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    return theUser ? [true, theUser] : [false, "No user found"];
  } catch (error) {
    return [false, { error }];
  }
};

const createAUser = async ({
  firstName,
  lastName,
  email,
  password,
}: ICreateAUser): Promise<[boolean, any]> => {
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return newUser ? [true, newUser] : [false, "Error creating User"];
  } catch (error) {
    return [false, { error }];
  }
};

export { findUserByEmail };
