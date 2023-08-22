import { Request, Response } from "express";
import { addBlogValidation, userIDValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import { findUserByID, verifyJWTToken } from "../services/userService";
import {
  createAPost,
  findAndEditPostDetails,
  findPostByID,
} from "../services/postService";

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

const getBlogPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { details } = await userIDValidation({ id });
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const check = await findPostByID(id);

  return check[0]
    ? responseHandler(
        res,
        "Post details retrieved successfully",
        200,
        true,
        check[1]
      )
    : responseHandler(res, check[1], 400, false, "");
};

const editBlogPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const check = await findPostByID(id);

  if (!check[0]) {
    return responseHandler(res, "Post does not exist", 400, false, "");
  }

  //validate req.body
  let { details } = await addBlogValidation(req.body);
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const { title, description } = req.body;

  const editedPost = await findAndEditPostDetails({
    title,
    description,
    userId: id,
  });

  return editedPost[0]
    ? responseHandler(
        res,
        "Blog Post edited successfully",
        201,
        true,
        editedPost[1]
      )
    : responseHandler(res, editedPost[1], 400, false, "");
};
const deleteBlogPost = async (req: Request, res: Response) => {};
const getAllPosts = async (req: Request, res: Response) => {};

export { addBlogPost, getBlogPost, editBlogPost, deleteBlogPost, getAllPosts };
