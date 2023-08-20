import { Router } from "express";
const router = Router();
import {
  deleteUser,
  editUser,
  getUser,
  loginUser,
  resgisterUser,
} from "../controllers/userController";

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
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/register", resgisterUser);
router.post("/login", loginUser);
router.get("/get/user/:id", getUser);
router.put("/edit/user/:id", editUser);
router.delete("/delete/user/:id", deleteUser);

export default router;
