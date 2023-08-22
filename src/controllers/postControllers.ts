import { Request, Response } from "express";
import { addBlogValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import { findUserByID, verifyJWTToken } from "../services/userService";
import { createAPost } from "../services/postService";

const addBlogPost = async (req: Request, res: Response) => {
  //validate req.body
  const { details } = await addBlogValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];

    const check = verifyJWTToken(token);
    const { id } = check[1];

    const { title, description } = req.body;

    const person = await findUserByID(id);

    if (person[0]) {
      const createdPost = await createAPost({ title, description, userId: id });

      return createdPost[0]
        ? responseHandler(
            res,
            "Blog Post registered successfully",
            201,
            true,
            createdPost[1]
          )
        : responseHandler(res, createdPost[1], 400, false, "");
    }

    return responseHandler(res, "No user found", 400, false, "");
  }

  return responseHandler(res, "No authorization token found", 403, false, "");
};
const getBlogPost = async (req: Request, res: Response) => {};
const editBlogPost = async (req: Request, res: Response) => {};
const deleteBlogPost = async (req: Request, res: Response) => {};
const getAllPosts = async (req: Request, res: Response) => {};

export { addBlogPost, getBlogPost, editBlogPost, deleteBlogPost, getAllPosts };
