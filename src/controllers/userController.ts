import { Request, Response } from "express";
import { userRegisterValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import { createAUser, findUserByEmail } from "../services/userService";

const resgisterUser = async (req: Request, res: Response) => {
  console.log(req.body);

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
const loginUser = async (req: Request, res: Response) => {};
const getUser = async (req: Request, res: Response) => {};
const editUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export { resgisterUser, loginUser, getUser, editUser, deleteUser };
