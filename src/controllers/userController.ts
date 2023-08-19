import { Request, Response } from "express";
import { userRegisterValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";

const resgisterUser = async (req: Request, res: Response) => {
  //validate req.body
  const { details } = await userRegisterValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }
};
const loginUser = async (req: Request, res: Response) => {};
const getUser = async (req: Request, res: Response) => {};
const editUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export { resgisterUser, loginUser, getUser, editUser, deleteUser };
