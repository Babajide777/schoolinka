import { Request, Response } from "express";
import { addBlogValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";

const addBlogPost = async (req: Request, res: Response) => {
  //validate req.body
  const { details } = await addBlogValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }
};
const getBlogPost = async (req: Request, res: Response) => {};
const editBlogPost = async (req: Request, res: Response) => {};
const deleteBlogPost = async (req: Request, res: Response) => {};
const getAllPosts = async (req: Request, res: Response) => {};

export { addBlogPost, getBlogPost, editBlogPost, deleteBlogPost, getAllPosts };
