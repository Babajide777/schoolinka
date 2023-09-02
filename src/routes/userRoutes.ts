import { Router } from "express";
const router = Router();
import {
  deleteUser,
  editUser,
  getUser,
  loginUser,
  resgisterUser,
} from "../controllers/userController";
import verifyToken from "../middlewares/authMiddleware";

/**
 * @swagger
 *   /api/user/register:
 *     post:
 *       tags:
 *           - User
 *       summary: Create a User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

router.post("/register", resgisterUser);

/**
 * @swagger
 *   /api/user/login:
 *     post:
 *       tags:
 *           - User
 *       summary: Login a User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 */

router.post("/login", loginUser);

/**
 * @swagger
 *   /api/user/get/{userId}:
 *     get:
 *       tags:
 *           - User
 *       summary: Get user details
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: userId
 *          in: path
 *          description: The id of the user
 *          required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserDetailResponse'
 *      400:
 *        description: Bad request
 */

router.get("/get/:id", verifyToken, getUser);

/**
 * @swagger
 *   /api/user/edit/{userId}:
 *     put:
 *       tags:
 *           - User
 *       summary: Edit user details
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: userId
 *          in: path
 *          description: The id of the user
 *          required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserDetailResponse'
 *      400:
 *        description: Bad request
 */

router.put("/edit/:id", verifyToken, editUser);

/**
 * @swagger
 *   /api/user/delete/{userId}:
 *     delete:
 *       tags:
 *           - User
 *       summary: Delete user
 *       security:
 *         - jwtAuth: [] # Apply JWT authentication to this route
 *       parameters:
 *        - name: userId
 *          in: path
 *          description: The id of the user
 *          required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteUserResponse'
 *      400:
 *        description: Bad request
 */

router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
