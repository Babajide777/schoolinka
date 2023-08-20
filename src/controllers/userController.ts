import { Request, Response } from "express";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import {
  createAUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  signJwt,
  validatePassword,
} from "../services/userService";

const resgisterUser = async (req: Request, res: Response) => {
  //validate req.body
  const { details } = await userRegisterValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const check = await findUserByEmail({ email: req.body.email });

  if (check[0]) {
    return responseHandler(res, "Email taken", 400, false, "");
  }

  if (check[1].error) {
    return responseHandler(
      res,
      "Error creating a user",
      400,
      false,
      check[1].error
    );
  }

  const user = await createAUser(req.body);

  return user[0]
    ? responseHandler(res, "User registered successfully", 201, true, user[1])
    : responseHandler(res, "Error registering user", 400, false, "");
};
const loginUser = async (req: Request, res: Response) => {
  //validate req.body
  const { details } = await userLoginValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  //Check if email already exist in the database
  const anyUser = await findUserByEmailWithPassword({
    email: req.body.email,
  });

  if (!anyUser[0]) {
    return responseHandler(
      res,
      "Email or Password is incorrect",
      400,
      false,
      ""
    );
  }

  //validate incoming password with database password
  if (await validatePassword(req.body.password, anyUser[1].password)) {
    signJwt;
    let signedJWT = signJwt(anyUser[1].id);

    return responseHandler(res, "Login Successful", 200, true, signedJWT);
  }
  return responseHandler(res, "Email or Password is incorrect", 400, false, "");
};
const getUser = async (req: Request, res: Response) => {};
const editUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export { resgisterUser, loginUser, getUser, editUser, deleteUser };
