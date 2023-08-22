import { Router } from "express";
import {
  addBlogPost,
  deleteBlogPost,
  editBlogPost,
  getAllPosts,
  getBlogPost,
} from "../controllers/postControllers";
import verifyToken from "../middlewares/authMiddleware";
const router = Router();

router.post("/add", verifyToken, addBlogPost);
router.get("/get/:id", verifyToken, getBlogPost);
router.put("/edit/:id", verifyToken, editBlogPost);
router.delete("/delete", verifyToken, deleteBlogPost);
router.get("/all", verifyToken, getAllPosts);

export default router;
