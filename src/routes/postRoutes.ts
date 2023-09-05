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

/**
 * @swagger
 *   /api/blog/add:
 *     post:
 *       tags:
 *           - Blog
 *       summary: Create a Blog
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      400:
 *        description: Bad request
 */

router.post("/add", verifyToken, addBlogPost);

/**
 * @swagger
 *   /api/blog/get/{blogId}:
 *     get:
 *       tags:
 *           - Blog
 *       summary: Get user details
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: blogId
 *          in: path
 *          description: The id of the blog
 *          required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      400:
 *        description: Bad request
 */

router.get("/get/:id", getBlogPost);

/**
 * @swagger
 *   /api/user/blog/{blogId}:
 *     put:
 *       tags:
 *           - Blog
 *       summary: Edit blog details
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: blogId
 *          in: path
 *          description: The id of the blog
 *          required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      400:
 *        description: Bad request
 */

router.put("/edit/:id", verifyToken, editBlogPost);

/**
 * @swagger
 *   /api/blog/delete/{blogId}:
 *     delete:
 *       tags:
 *           - Blog
 *       summary: Delete blog post
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: blogId
 *          in: path
 *          description: The id of the blog post
 *          required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeletePostResponse'
 *      400:
 *        description: Bad request
 */

router.delete("/delete/:id", verifyToken, deleteBlogPost);

/**
 * @swagger
 *   /api/blog/all:
 *     get:
 *       tags:
 *           - Blog
 *       summary: Get all blog posts
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllPostsDetailResponse'
 *      400:
 *        description: Bad request
 */

router.get("/all", getAllPosts);

export default router;
