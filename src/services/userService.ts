import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const TOKEN_SECRET: any = process.env.TOKEN_SECRET;

interface IFindByEmail {
  email: string;
}

interface ICreateAUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IData {
  token?: string;
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
      password: await hashedPassword(password),
    });

    return newUser
      ? [true, signJwt(newUser.id)]
      : [false, "Error creating User"];
  } catch (error) {
    return [false, { error }];
  }
};

//To hash pasword
const hashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(password, salt);
};

// create and sign json web token for a
const signJwt = (id: number): IData => {
  const token = jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const data: IData = {};
  data.token = token;
  return { token: data.token };
};

const findUserByEmailWithPassword = async ({
  email,
}: IFindByEmail): Promise<[boolean, any]> => {
  try {
    const theUser = await User.findOne({
      where: { email: email },
    });

    return theUser ? [true, theUser] : [false, "No user found"];
  } catch (error) {
    return [false, { error }];
  }
};

//To validate user password
const validatePassword = async (
  formPassword: string,
  dbPassword: string
): Promise<[boolean, any]> => {
  try {
    const check = await bcrypt.compare(formPassword, dbPassword);

    return check
      ? [true, "Password correct"]
      : [false, "Email or Password is incorrect"];
  } catch (error) {
    return [false, { error }];
  }
};

const verifyJWTToken = (token: string): [boolean, any] => {
  try {
    let verifyToken = jwt.verify(token, TOKEN_SECRET);

    return [true, verifyToken];
  } catch (error) {
    return [false, "invalid or Expired JWT"];
  }
};

export {
  findUserByEmail,
  createAUser,
  findUserByEmailWithPassword,
  validatePassword,
  signJwt,
  verifyJWTToken,
};
