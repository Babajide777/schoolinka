import { Response } from "express";

// Response handler to handle all api responses
let responseHandler = (
  res: Response,
  message: string,
  statusCode: number,
  success: boolean = false,
  data: object = {}
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default responseHandler;
