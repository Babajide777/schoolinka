import { Request, Response } from "express";
import { addBlogValidation, userIDValidation } from "../utils/validation";
import responseHandler from "../utils/responseHandler";
import { findUserByID, verifyJWTToken } from "../services/userService";
import {
  createAPost,
  findAllPosts,
  findAndDeleteAPost,
  findAndEditPostDetails,
  findPostByID,
  getPostsUsingSearch,
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
            "Blog Post created successfully",
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
  const postId = Number(req.params.id);

  if (!Number.isInteger(postId)) {
    return responseHandler(res, "Invalid Post Id", 400, false, "");
  }

  const check = await findPostByID(postId);

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

  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];

    const check = verifyJWTToken(token);
    const { id } = check[1];

    const { title, description } = req.body;

    const editedPost = await findAndEditPostDetails({
      title,
      description,
      userId: id,
      postId,
    });

    const check2 = await findPostByID(postId);

    return editedPost[0]
      ? responseHandler(
          res,
          "Blog Post edited successfully",
          201,
          true,
          check2[1]
        )
      : responseHandler(res, editedPost[1], 400, false, "");
  }

  return responseHandler(res, "No authorization token found", 403, false, "");
};

const deleteBlogPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { details } = await userIDValidation({ id });
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  const check = await findAndDeleteAPost(id);

  return check[0]
    ? responseHandler(res, "Post deleted successfully", 200, true, "")
    : responseHandler(res, "Error deleting Post", 400, false, check[1]);
};

const getAllPosts = async (req: Request, res: Response) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];

    const check = verifyJWTToken(token);
    const { id } = check[1];

    const allPosts = await findAllPosts(id);

    return allPosts[0]
      ? responseHandler(
          res,
          "All Posts retrieved successfully",
          200,
          true,
          allPosts[1]
        )
      : responseHandler(res, allPosts[1], 400, false, "");
  }

  return responseHandler(res, "No authorization token found", 403, false, "");
};

//controller for post search
const postSearch = async (req: Request, res: Response) => {
  const { searchTerm, page, limit } = req.query;

  const currentPage = Number(page) || 1;

  const { details } = await userIDValidation({ id: currentPage });
  if (details) {
    let allErrors = details.map((detail: any) =>
      detail.message.replace(/"/g, "")
    );
    return responseHandler(res, allErrors, 400, false, "");
  }

  if (typeof searchTerm == "string") {
    // get posts depending on search
    const searchResult = await getPostsUsingSearch(
      searchTerm,
      currentPage,
      Number(limit)
    );

    //check if search was successful
    if (searchResult[0]) {
      return responseHandler(
        res,
        "returned searched results",
        200,
        searchResult[0],
        searchResult[1]
      );
    }
    return responseHandler(res, searchResult[1], 400, searchResult[0], "");
  }
  return responseHandler(res, "Add a valid search term", 400, false, "");
};

export {
  addBlogPost,
  getBlogPost,
  editBlogPost,
  deleteBlogPost,
  getAllPosts,
  postSearch,
};
