import { Request, Response, NextFunction } from "express";
import responseHandler from "../utils/responseHandler";
import { verifyJWTToken } from "../services/userService";

// Middleware to validate user jwt token
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];
    const check = verifyJWTToken(token);

    if (!check[0]) {
      return responseHandler(res, check[1], 403, false, "");
    }

    const { id, exp, err } = check[1];
    if (err) {
      return responseHandler(res, err, 403, false, "");
    }

    if (id && exp < Date.now()) {
      next();
      return;
    } else {
      return responseHandler(res, "Expired token", 403, false, "");
    }
  }
  return responseHandler(res, "No authorization token found", 403, false, "");
};

export default verifyToken;
