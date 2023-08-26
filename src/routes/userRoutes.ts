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
router.get("/get/:id", verifyToken, getUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
