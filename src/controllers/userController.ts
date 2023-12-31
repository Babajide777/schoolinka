import { Request, Response } from "express";
import {
  userIDValidation,
  userLoginValidation,
  userRegisterValidation,
} from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import {
  createAUser,
  findAndDeleteAUser,
  findAndEditUserDetails,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserByID,
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

const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { details } = await userIDValidation({ id });
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const check = await findUserByID(id);

  return check[0]
    ? responseHandler(
        res,
        "User details retrieved successfully",
        200,
        true,
        check[1]
      )
    : responseHandler(res, "Error retrieving user details", 400, false, "");
};

const editUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return responseHandler(res, "Invalid User Id", 400, false, "");
  }

  //validate req.body
  const { details } = await userRegisterValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  //Check if email already exist in the database
  const anyUser = await findUserByEmail({
    email: req.body.email,
  });

  if (!anyUser[0]) {
    return responseHandler(res, "User does not exist", 400, false, "");
  }

  const editedUser = await findAndEditUserDetails({ ...req.body, id });

  //get the new User details
  const anyUser2 = await findUserByEmail({
    email: req.body.email,
  });

  return editedUser[0]
    ? responseHandler(res, editedUser[1], 200, true, anyUser2[1])
    : responseHandler(res, editedUser[1], 400, false, "");
};

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { details } = await userIDValidation({ id });
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const check = await findAndDeleteAUser(id);

  return check[0]
    ? responseHandler(res, "User deleted successfully", 200, true, "")
    : responseHandler(res, "Error deleting User", 400, false, check[1]);
};

export { resgisterUser, loginUser, getUser, editUser, deleteUser };
