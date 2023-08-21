import { Router } from "express";
import {
  addBlogPost,
  deleteBlogPost,
  editBlogPost,
  getAllPosts,
  getBlogPost,
} from "../controllers/postControllers";
const router = Router();

router.post("/add", addBlogPost);
router.get("/get", getBlogPost);
router.put("/edit", editBlogPost);
router.delete("/delete", deleteBlogPost);
router.get("/all", getAllPosts);

export default router;
